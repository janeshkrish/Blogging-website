import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Comment from './Comment';
import axios from 'axios';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async (pageNum = 1) => {
    try {
      const response = await axios.get(`/comments/post/${postId}?page=${pageNum}&limit=20`);
      if (pageNum === 1) {
        setComments(response.data.comments);
      } else {
        setComments(prev => [...prev, ...response.data.comments]);
      }
      setHasMore(pageNum < response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }

    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post('/comments', {
        body: newComment.trim(),
        postId
      });

      setComments(prev => [response.data.comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments(prev =>
      prev.map(comment =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };

  const handleCommentDelete = (commentId) => {
    setComments(prev => prev.filter(comment => comment._id !== commentId));
  };

  const loadMoreComments = () => {
    fetchComments(page + 1);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading comments...
      </div>
    );
  }

  return (
    <div id="comments" style={{ marginTop: '40px' }}>
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginBottom: '24px',
        color: '#212529'
      }}>
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '32px' }}>
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <img
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                alt={user.username}
                className="avatar avatar-md"
              />
              <div style={{ flex: 1 }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Share your thoughts..."
                  rows={4}
                  disabled={submitting}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  marginTop: '12px' 
                }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting || !newComment.trim()}
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <p style={{ color: '#6c757d', margin: 0 }}>
            Please <a href="/login" style={{ color: '#667eea' }}>login</a> to join the discussion.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h4 style={{ marginBottom: '8px' }}>No comments yet</h4>
            <p>Be the first to share your thoughts!</p>
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postId={postId}
                onUpdate={handleCommentUpdate}
                onDelete={handleCommentDelete}
              />
            ))}

            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={loadMoreComments}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Comments'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSection;