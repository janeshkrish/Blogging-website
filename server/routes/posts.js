import express from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Notification from '../models/Notification.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Create post
router.post('/', authenticateToken, [
  body('title').isLength({ min: 1, max: 200 }).trim(),
  body('body').isLength({ min: 1, max: 10000 }).trim(),
  body('tags').optional().isArray(),
  body('status').optional().isIn(['draft', 'published'])
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, tags = [], image = '', status = 'published' } = req.body;

  const post = new Post({
    title,
    body,
    author: req.user._id,
    tags: tags.map(tag => tag.toLowerCase().trim()).filter(tag => tag),
    image,
    status
  });

  await post.save();
  await post.populate('author', 'username profilePicture');

  // Update user's post count if published
  if (status === 'published') {
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { postsCount: 1 }
    });
  }

  res.status(201).json({
    message: 'Post created successfully',
    post
  });
}));

// Get all posts with pagination and filtering
router.get('/', optionalAuth, asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    tag, 
    search, 
    author,
    sortBy = 'createdAt',
    order = 'desc'
  } = req.query;

  const query = { status: 'published' };
  
  if (tag) {
    query.tags = { $in: [tag.toLowerCase()] };
  }
  
  if (search) {
    query.$text = { $search: search };
  }

  if (author) {
    const user = await User.findOne({ username: author });
    if (user) {
      query.author = user._id;
    }
  }

  const sortOrder = order === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrder };

  const posts = await Post.find(query)
    .populate('author', 'username profilePicture')
    .sort(sortOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Post.countDocuments(query);

  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total
  });
}));

// Get single post by slug
router.get('/:slug', optionalAuth, asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const post = await Post.findOne({ slug })
    .populate('author', 'username profilePicture bio');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check if user can view draft
  if (post.status === 'draft') {
    if (!req.user || req.user._id.toString() !== post.author._id.toString()) {
      return res.status(404).json({ message: 'Post not found' });
    }
  }

  // Increment view count
  await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

  // Check if current user liked this post
  let isLiked = false;
  if (req.user) {
    isLiked = post.likes.some(like => 
      like.user.toString() === req.user._id.toString()
    );
  }

  res.json({
    post: {
      ...post.toJSON(),
      isLiked
    }
  });
}));

// Update post
router.put('/:id', authenticateToken, [
  body('title').optional().isLength({ min: 1, max: 200 }).trim(),
  body('body').optional().isLength({ min: 1, max: 10000 }).trim(),
  body('tags').optional().isArray(),
  body('status').optional().isIn(['draft', 'published'])
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check ownership
  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this post' });
  }

  const { title, body, tags, image, status } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (body !== undefined) updateData.body = body;
  if (tags !== undefined) {
    updateData.tags = tags.map(tag => tag.toLowerCase().trim()).filter(tag => tag);
  }
  if (image !== undefined) updateData.image = image;
  if (status !== undefined) {
    // Update user's post count when changing status
    if (post.status === 'draft' && status === 'published') {
      await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: 1 } });
    } else if (post.status === 'published' && status === 'draft') {
      await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });
    }
    updateData.status = status;
  }

  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true })
    .populate('author', 'username profilePicture');

  res.json({
    message: 'Post updated successfully',
    post: updatedPost
  });
}));

// Delete post
router.delete('/:id', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check ownership or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this post' });
  }

  // Delete associated comments
  await Comment.deleteMany({ post: id });

  // Delete associated notifications
  await Notification.deleteMany({ 
    entityId: id, 
    entityType: 'Post' 
  });

  await Post.findByIdAndDelete(id);

  // Update user's post count if it was published
  if (post.status === 'published') {
    await User.findByIdAndUpdate(post.author, {
      $inc: { postsCount: -1 }
    });
  }

  res.json({ message: 'Post deleted successfully' });
}));

// Like/Unlike post
router.post('/:id/like', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const existingLike = post.likes.find(like => 
    like.user.toString() === req.user._id.toString()
  );

  if (existingLike) {
    // Unlike
    post.likes = post.likes.filter(like => 
      like.user.toString() !== req.user._id.toString()
    );
    post.likesCount = Math.max(0, post.likesCount - 1);
    await post.save();

    // Remove notification
    await Notification.findOneAndDelete({
      recipient: post.author,
      sender: req.user._id,
      entityId: id,
      type: 'like'
    });

    res.json({ message: 'Post unliked', isLiked: false, likesCount: post.likesCount });
  } else {
    // Like
    post.likes.push({ user: req.user._id });
    post.likesCount += 1;
    await post.save();

    // Create notification if not own post
    if (post.author.toString() !== req.user._id.toString()) {
      const notification = new Notification({
        recipient: post.author,
        sender: req.user._id,
        type: 'like',
        message: `${req.user.username} liked your post "${post.title}"`,
        entityId: id,
        entityType: 'Post'
      });
      await notification.save();

      // Send real-time notification
      const io = req.app.get('io');
      io.to(post.author.toString()).emit('notification', {
        _id: notification._id,
        type: 'like',
        message: notification.message,
        sender: {
          username: req.user.username,
          profilePicture: req.user.profilePicture
        },
        createdAt: notification.createdAt,
        isRead: false
      });
    }

    res.json({ message: 'Post liked', isLiked: true, likesCount: post.likesCount });
  }
}));

// Get trending tags
router.get('/tags/trending', asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const tags = await Post.aggregate([
    { $match: { status: 'published' } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: parseInt(limit) }
  ]);

  res.json({ 
    tags: tags.map(tag => ({ 
      name: tag._id, 
      count: tag.count 
    })) 
  });
}));

export default router;