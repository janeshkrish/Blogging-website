import express from 'express';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Follow/Unfollow user
router.post('/:userId', authenticateToken, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  if (userId === req.user._id.toString()) {
    return res.status(400).json({ message: 'Cannot follow yourself' });
  }

  const userToFollow = await User.findById(userId);
  if (!userToFollow) {
    return res.status(404).json({ message: 'User not found' });
  }

  const currentUser = await User.findById(req.user._id);
  const isFollowing = currentUser.following.includes(userId);

  if (isFollowing) {
    // Unfollow
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: userId },
      $inc: { followingCount: -1 }
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { followers: req.user._id },
      $inc: { followersCount: -1 }
    });

    // Remove follow notification
    await Notification.findOneAndDelete({
      recipient: userId,
      sender: req.user._id,
      type: 'follow'
    });

    res.json({ message: 'User unfollowed successfully', isFollowing: false });
  } else {
    // Follow
    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: userId },
      $inc: { followingCount: 1 }
    });

    await User.findByIdAndUpdate(userId, {
      $push: { followers: req.user._id },
      $inc: { followersCount: 1 }
    });

    // Create notification
    const notification = new Notification({
      recipient: userId,
      sender: req.user._id,
      type: 'follow',
      message: `${req.user.username} started following you`,
      entityId: req.user._id,
      entityType: 'User'
    });
    await notification.save();

    // Send real-time notification
    const io = req.app.get('io');
    io.to(userId).emit('notification', {
      _id: notification._id,
      type: 'follow',
      message: notification.message,
      sender: {
        username: req.user.username,
        profilePicture: req.user.profilePicture
      },
      createdAt: notification.createdAt,
      isRead: false
    });

    res.json({ message: 'User followed successfully', isFollowing: true });
  }
}));

// Get followers
router.get('/:userId/followers', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const user = await User.findById(userId)
    .populate({
      path: 'followers',
      select: 'username profilePicture bio followersCount',
      options: {
        skip: (page - 1) * limit,
        limit: parseInt(limit)
      }
    });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const totalFollowers = user.followersCount;

  res.json({
    followers: user.followers,
    totalPages: Math.ceil(totalFollowers / limit),
    currentPage: parseInt(page),
    total: totalFollowers
  });
}));

// Get following
router.get('/:userId/following', asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const user = await User.findById(userId)
    .populate({
      path: 'following',
      select: 'username profilePicture bio followersCount',
      options: {
        skip: (page - 1) * limit,
        limit: parseInt(limit)
      }
    });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const totalFollowing = user.followingCount;

  res.json({
    following: user.following,
    totalPages: Math.ceil(totalFollowing / limit),
    currentPage: parseInt(page),
    total: totalFollowing
  });
}));

// Check if user is following another user
router.get('/:userId/is-following', authenticateToken, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const currentUser = await User.findById(req.user._id);
  const isFollowing = currentUser.following.includes(userId);
  
  res.json({ isFollowing });
}));

export default router;