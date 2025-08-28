import express from 'express';
import { body, validationResult } from 'express-validator';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import Notification from '../models/Notification.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  // Get top-level comments (no parent)
  const comments = await Comment.find({ 
    post: postId, 
    parentComment: null,
    isDeleted: false
  })
  .populate('author', 'username profilePicture')
  .populate({
    path: 'replies',
    populate: {
      path: 'author',
      select: 'username profilePicture'
    },
    match: { isDeleted: false }
  })
  .sort({ createdAt: -1 })
  .limit(limit * 1)
  .skip((page - 1) * limit);

  const total = await Comment.countDocuments({ 
    post: postId, 
    parentComment: null,
    isDeleted: false
  });

  res.json({
    comments,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total
  });
}));

// Create comment
router.post('/', authenticateToken, [
  body('body').isLength({ min: 1, max: 1000 }).trim(),
  body('postId').isMongoId(),
  body('parentCommentId').optional().isMongoId()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body, postId, parentCommentId } = req.body;

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check if parent comment exists (for replies)
  let parentComment = null;
  if (parentCommentId) {
    parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }
  }

  const comment = new Comment({
    body,
    author: req.user._id,
    post: postId,
    parentComment: parentCommentId || null
  });

  await comment.save();
  await comment.populate('author', 'username profilePicture');

  // Update post comment count
  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 }
  });

  // Add to parent comment replies
  if (parentComment) {
    parentComment.replies.push(comment._id);
    await parentComment.save();
  }

  // Create notification for post author (if not own post)
  if (post.author.toString() !== req.user._id.toString()) {
    const notification = new Notification({
      recipient: post.author,
      sender: req.user._id,
      type: 'comment',
      message: `${req.user.username} commented on your post "${post.title}"`,
      entityId: postId,
      entityType: 'Post'
    });
    await notification.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(post.author.toString()).emit('notification', {
      _id: notification._id,
      type: 'comment',
      message: notification.message,
      sender: {
        username: req.user.username,
        profilePicture: req.user.profilePicture
      },
      createdAt: notification.createdAt,
      isRead: false
    });
  }

  // Create notification for parent comment author (for replies)
  if (parentComment && parentComment.author.toString() !== req.user._id.toString()) {
    const notification = new Notification({
      recipient: parentComment.author,
      sender: req.user._id,
      type: 'comment',
      message: `${req.user.username} replied to your comment`,
      entityId: comment._id,
      entityType: 'Comment'
    });
    await notification.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(parentComment.author.toString()).emit('notification', {
      _id: notification._id,
      type: 'comment',
      message: notification.message,
      sender: {
        username: req.user.username,
        profilePicture: req.user.profilePicture
      },
      createdAt: notification.createdAt,
      isRead: false
    });
  }

  res.status(201).json({
    message: 'Comment created successfully',
    comment
  });
}));

// Update comment
router.put('/:id', authenticateToken, [
  body('body').isLength({ min: 1, max: 1000 }).trim()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { body } = req.body;

  const comment = await Comment.findById(id);
  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Check ownership
  if (comment.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this comment' });
  }

  comment.body = body;
  await comment.save();
  await comment.populate('author', 'username profilePicture');

  res.json({
    message: 'Comment updated successfully',
    comment
  });
}));

// Delete comment
router.delete('/:id', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Check ownership or admin
  if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this comment' });
  }

  // Soft delete
  comment.isDeleted = true;
  comment.body = '[Comment deleted]';
  await comment.save();

  // Update post comment count
  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: -1 }
  });

  // Delete notifications
  await Notification.deleteMany({
    entityId: id,
    entityType: 'Comment'
  });

  res.json({ message: 'Comment deleted successfully' });
}));

// Like/Unlike comment
router.post('/:id/like', authenticateToken, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);

  if (!comment || comment.isDeleted) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const existingLike = comment.likes.find(like => 
    like.user.toString() === req.user._id.toString()
  );

  if (existingLike) {
    // Unlike
    comment.likes = comment.likes.filter(like => 
      like.user.toString() !== req.user._id.toString()
    );
    comment.likesCount = Math.max(0, comment.likesCount - 1);
    await comment.save();

    res.json({ message: 'Comment unliked', isLiked: false, likesCount: comment.likesCount });
  } else {
    // Like
    comment.likes.push({ user: req.user._id });
    comment.likesCount += 1;
    await comment.save();

    res.json({ message: 'Comment liked', isLiked: true, likesCount: comment.likesCount });
  }
}));

export default router;