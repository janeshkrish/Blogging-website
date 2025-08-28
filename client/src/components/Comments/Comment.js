import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Comment = ({ comment, postId, onUpdate, onDelete, isReply = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.body);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const { user } = useAuth();

  const formatDate = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return commentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!user || !replyText.trim()) return;

    setSubmittingReply(true);
    try {
      const response = await axios.post('/comments', {
        body: replyText.trim(),
        postId,
        parentCommentId: comment._id
      });

      // Add reply to comment
      const updatedComment = {
        ...comment,
        replies: [response.data.comment, ...(comment.replies || [])]
      };
      onUpdate(updatedComment);
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Failed to submit reply:', error);
      alert('Failed to submit reply. Please try again.');
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    setSubmittingEdit(true);
    try {
      const response = await axios.put(`/comments/${comment._id}`, {
        body: editText.trim()
      });
      onUpdate(response.data.comment);
      setEditing(false);
    } catch (error) {
      console.error('Failed to edit comment:', error);
      alert('Failed to edit comment. Please try again.');
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await axios.delete(`/comments/${comment._id}`);
      onDelete(comment._id);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like comments');
      return;
    }

    try {
      const response = await axios.post(`/comments/${comment._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  if (comment.isDeleted) {
    return (
      <div className={`comment ${isReply ? 'comment-reply' : ''}`} 
           style={{ opacity: 0.6 }}>
        <div style={{ 
          padding: '16px', 
          fontStyle: 'italic', 
          color: '#6c757d',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          [This comment has been deleted]
        </div>
      </div>
    );
  }

  return (
    <div className={`comment ${isReply ? 'comment-reply' : ''}`}>
      <div className="comment-header">
        <img
          src={comment.author?.profilePicture || `https://ui-avatars.com/api/?name=${comment.author?.username}&background=667eea&color=fff`}
          alt={comment.author?.username}
          className="avatar avatar-sm"
        />
        <div>
          <Link
            to={`/user/${comment.author?.username}`}
            className="comment-author"
          >
            {comment.author?.username}
          </Link>
          <div className="comment-date">
            {formatDate(comment.createdAt)}
          </div>
        </div>
      </div>

      <div className="comment-body">
        {editing ? (
          <form onSubmit={handleEdit}>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="form-input form-textarea"
              rows={3}
              disabled={submittingEdit}
            />
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '8px' 
            }}>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={submittingEdit || !editText.trim()}
              >
                {submittingEdit ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setEditText(comment.body);
                }}
                className="btn btn-sm btn-secondary"
                disabled={submittingEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p>{comment.body}</p>
        )}
      </div>

      <div className="comment-actions">
        <button
          onClick={handleLike}
          className={`post-action ${isLiked ? 'liked' : ''}`}
          disabled={!user}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          {likesCount > 0 && <span>{likesCount}</span>}
          }
        </button>

        {user && !isReply && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="post-action"
          >
            <span>💬</span>
            <span>Reply</span>
          </button>
        )}

        {user && user._id === comment.author?._id && (
          <>
            <button
              onClick={() => setEditing(true)}
              className="post-action"
              disabled={editing}
            >
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="post-action"
              style={{ color: '#dc3545' }}
            >
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          </>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && user && (
        <div style={{ marginTop: '16px', paddingLeft: '48px' }}>
          <form onSubmit={handleReplySubmit}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <img
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                alt={user.username}
                className="avatar avatar-sm"
              />
              <div style={{ flex: 1 }}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Write a reply..."
                  rows={3}
                  disabled={submittingReply}
                />
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '8px' 
                }}>
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={submittingReply || !replyText.trim()}
                  >
                    {submittingReply ? 'Replying...' : 'Reply'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyText('');
                    }}
                    className="btn btn-sm btn-secondary"
                    disabled={submittingReply}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              postId={postId}
              onUpdate={(updatedReply) => {
                const updatedComment = {
                  ...comment,
                  replies: comment.replies.map(r =>
                    r._id === updatedReply._id ? updatedReply : r
                  )
                };
                onUpdate(updatedComment);
              }}
              onDelete={(replyId) => {
                const updatedComment = {
                  ...comment,
                  replies: comment.replies.filter(r => r._id !== replyId)
                };
                onUpdate(updatedComment);
              }}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;