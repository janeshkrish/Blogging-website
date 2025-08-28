import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get user profile by username
router.get('/:username', optionalAuth, asyncHandler(async (req, res) => {
  const { username } = req.params;
  
  const user = await User.findOne({ username })
    .select('-password -email')
    .populate('followers', 'username profilePicture')
    .populate('following', 'username profilePicture');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if current user is following this user
  let isFollowing = false;
  if (req.user && user.followers.some(follower => 
    follower._id.toString() === req.user._id.toString()
  )) {
    isFollowing = true;
  }

  res.json({
    user: user.toJSON(),
    isFollowing
  });
}));

// Get user's posts
router.get('/:username/posts', optionalAuth, asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 10, status = 'published' } = req.query;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Only show drafts if it's the user's own posts
  const query = { author: user._id };
  if (req.user && req.user._id.toString() === user._id.toString()) {
    // User can see their own drafts
    if (status !== 'all') {
      query.status = status;
    }
  } else {
    // Others can only see published posts
    query.status = 'published';
  }

  const posts = await Post.find(query)
    .populate('author', 'username profilePicture')
    .sort({ createdAt: -1 })
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

// Get suggested users to follow
router.get('/suggestions/follow', authenticateToken, asyncHandler(async (req, res) => {
  const { limit = 5 } = req.query;
  
  // Find users not followed by current user and exclude self
  const suggestedUsers = await User.find({
    _id: { 
      $nin: [...req.user.following, req.user._id] 
    }
  })
  .select('username profilePicture bio postsCount followersCount')
  .sort({ followersCount: -1, postsCount: -1 })
  .limit(parseInt(limit));

  res.json({ users: suggestedUsers });
}));

// Search users
router.get('/search/:query', optionalAuth, asyncHandler(async (req, res) => {
  const { query } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } }
    ]
  })
  .select('username profilePicture bio followersCount')
  .sort({ followersCount: -1 })
  .limit(limit * 1)
  .skip((page - 1) * limit);

  const total = await User.countDocuments({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } }
    ]
  });

  res.json({
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total
  });
}));

export default router;