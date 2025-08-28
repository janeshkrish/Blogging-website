import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(`/posts/${post._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
      
      if (onUpdate) {
        onUpdate({
          ...post,
          isLiked: response.data.isLiked,
          likesCount: response.data.likesCount
        });
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="post-card card">
      {post.image && (
        <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
          <img 
            src={post.image} 
            alt={post.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
      )}
      
      <div className="post-card-content" style={{ padding: '24px' }}>
        <div className="post-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={post.author?.profilePicture || `https://ui-avatars.com/api/?name=${post.author?.username}&background=667eea&color=fff`}
              alt={post.author?.username}
              className="avatar avatar-sm"
            />
            <div>
              <Link 
                to={`/user/${post.author?.username}`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#495057', 
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                {post.author?.username}
              </Link>
              <div className="post-card-meta">
                {formatDate(post.createdAt)}
                {post.readingTime && (
                  <span> · {post.readingTime} min read</span>
                )}
                {post.status === 'draft' && (
                  <span className="badge" style={{ 
                    marginLeft: '8px', 
                    background: '#ffc107', 
                    color: '#000' 
                  }}>
                    Draft
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Link to={`/post/${post.slug}`} className="post-card-title">
          {post.title}
        </Link>

        <p className="post-card-excerpt">
          {truncateContent(post.body)}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/search?tag=${tag}`}
                className="post-tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        <div className="post-card-footer">
          <div className="post-actions">
            <button
              onClick={handleLike}
              className={`post-action ${isLiked ? 'liked' : ''}`}
              disabled={loading}
              style={{ 
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              <span style={{ fontSize: '16px' }}>
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span>{likesCount}</span>
            </button>

            <Link
              to={`/post/${post.slug}#comments`}
              className="post-action"
              style={{ textDecoration: 'none' }}
            >
              <span style={{ fontSize: '16px' }}>💬</span>
              <span>{post.commentsCount || 0}</span>
            </Link>

            <div className="post-action">
              <span style={{ fontSize: '16px' }}>👀</span>
              <span>{post.views || 0}</span>
            </div>
          </div>

          {user && user._id === post.author?._id && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                to={`/edit/${post._id}`}
                className="btn btn-sm btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostCard;