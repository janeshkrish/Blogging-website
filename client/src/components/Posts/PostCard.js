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

  const truncateContent = (content, maxLength = 180) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="post-card card">
      <div className="post-card-content">
        <div className="post-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <img
              src={post.author?.profilePicture || `https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200`}
              alt={post.author?.username}
              className="avatar avatar-md"
            />
            <div>
              <Link 
                to={`/user/${post.author?.username}`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#065f46', 
                  fontWeight: '700',
                  fontSize: '18px',
                  transition: 'color 0.3s ease'
                }}
              >
                {post.author?.username}
              </Link>
              <div className="post-card-meta">
                {formatDate(post.createdAt)}
                {post.readingTime && (
                  <span> · {post.readingTime} min read</span>
                )}
                <span> · {post.views || 0} views</span>
                {post.status === 'draft' && (
                  <span className="badge" style={{ 
                    marginLeft: '16px', 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
                    color: 'white',
                    fontSize: '13px',
                    padding: '8px 16px'
                  }}>
                    Draft
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {user && user._id === post.author?._id && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link
                to={`/edit/${post._id}`}
                className="btn btn-sm btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                ✏️ Edit
              </Link>
            </div>
          )}
        </div>

        <Link to={`/post/${post.slug}`} className="post-card-title">
          {post.title}
        </Link>

        <p className="post-card-excerpt">
          {truncateContent(post.body)}
        </p>

        {post.image && (
          <div style={{ 
            width: '100%', 
            height: '320px', 
            overflow: 'hidden', 
            borderRadius: '24px', 
            marginBottom: '32px',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)'
          }}>
            <img 
              src={post.image} 
              alt={post.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
        )}

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
                gap: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              <span style={{ fontSize: '22px' }}>
                {isLiked ? '💖' : '🤍'}
              </span>
              <span>{likesCount}</span>
            </button>

            <Link
              to={`/post/${post.slug}#comments`}
              className="post-action"
              style={{ textDecoration: 'none' }}
            >
              <span style={{ fontSize: '22px' }}>💬</span>
              <span>{post.commentsCount || 0}</span>
            </Link>

            <div className="post-action">
              <span style={{ fontSize: '22px' }}>👁️</span>
              <span>{post.views || 0}</span>
            </div>

            <button className="post-action">
              <span style={{ fontSize: '22px' }}>📤</span>
              <span>Share</span>
            </button>
          </div>

          <Link
            to={`/post/${post.slug}`}
            className="btn btn-sm btn-outline"
            style={{ textDecoration: 'none' }}
          >
            📖 Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;