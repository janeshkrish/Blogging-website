import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CommentSection from '../components/Comments/CommentSection';
import axios from 'axios';

const PostDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${slug}`);
      const postData = response.data.post;
      setPost(postData);
      setIsLiked(postData.isLiked || false);
      setLikesCount(postData.likesCount || 0);
      
      // Check if following the author
      if (user && postData.author._id !== user._id) {
        checkFollowStatus(postData.author._id);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Post not found');
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (authorId) => {
    try {
      const response = await axios.get(`/follow/${authorId}/is-following`);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Failed to check follow status:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }

    try {
      const response = await axios.post(`/posts/${post._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      alert('Please login to follow users');
      return;
    }

    try {
      const response = await axios.post(`/follow/${post.author._id}`);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/posts/${post._id}`);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>😕</div>
        <h2 style={{ marginBottom: '16px', color: '#495057' }}>Post Not Found</h2>
        <p style={{ color: '#6c757d', marginBottom: '24px' }}>
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Featured Image */}
        {post.image && (
          <div style={{ 
            marginBottom: '32px', 
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
          }}>
            <img 
              src={post.image} 
              alt={post.title}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover' 
              }}
            />
          </div>
        )}

        {/* Post Header */}
        <header style={{ marginBottom: '32px' }}>
          {post.status === 'draft' && (
            <div className="badge" style={{ 
              marginBottom: '16px', 
              background: '#ffc107', 
              color: '#000',
              fontSize: '14px',
              padding: '8px 16px'
            }}>
              🚧 Draft - Only visible to you
            </div>
          )}

          <h1 style={{ 
            fontSize: '40px', 
            fontWeight: '700', 
            lineHeight: '1.3', 
            marginBottom: '24px',
            color: '#212529'
          }}>
            {post.title}
          </h1>

          {/* Author Info */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={post.author.profilePicture || `https://ui-avatars.com/api/?name=${post.author.username}&background=667eea&color=fff`}
                alt={post.author.username}
                className="avatar avatar-lg"
              />
              <div>
                <Link 
                  to={`/user/${post.author.username}`}
                  style={{ 
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#495057', 
                    textDecoration: 'none' 
                  }}
                >
                  {post.author.username}
                </Link>
                <div style={{ 
                  color: '#6c757d', 
                  fontSize: '14px',
                  marginTop: '4px'
                }}>
                  {formatDate(post.createdAt)}
                  {post.readingTime && (
                    <span> · {post.readingTime} min read</span>
                  )}
                  <span> · {post.views || 0} views</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {user && user._id !== post.author._id && (
                <button
                  onClick={handleFollow}
                  className={`btn btn-sm ${isFollowing ? 'btn-secondary' : 'btn-outline'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}

              {user && user._id === post.author._id && (
                <>
                  <Link
                    to={`/edit/${post._id}`}
                    className="btn btn-sm btn-secondary"
                    style={{ textDecoration: 'none' }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {post.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/search?tag=${tag}`}
                  className="post-tag"
                  style={{ textDecoration: 'none' }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div style={{ 
          fontSize: '18px', 
          lineHeight: '1.8', 
          color: '#495057',
          marginBottom: '40px'
        }}>
          <div 
            dangerouslySetInnerHTML={{ __html: formatContent(post.body) }}
            style={{
              '& h2': {
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '32px',
                marginBottom: '16px',
                color: '#212529'
              },
              '& h3': {
                fontSize: '24px',
                fontWeight: '600',
                marginTop: '24px',
                marginBottom: '12px',
                color: '#212529'
              },
              '& code': {
                background: '#f8f9fa',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '16px',
                border: '1px solid #e9ecef'
              },
              '& pre': {
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'auto',
                border: '1px solid #e9ecef',
                margin: '16px 0'
              },
              '& pre code': {
                background: 'none',
                padding: 0,
                border: 'none'
              }
            }}
          />
        </div>

        {/* Post Actions */}
        <div style={{ 
          borderTop: '1px solid #e9ecef',
          borderBottom: '1px solid #e9ecef',
          padding: '20px 0',
          marginBottom: '40px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button
                onClick={handleLike}
                className={`post-action ${isLiked ? 'liked' : ''}`}
                disabled={!user}
                style={{
                  fontSize: '16px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isLiked ? '#ffe6e6' : '#f8f9fa',
                  cursor: user ? 'pointer' : 'not-allowed'
                }}
              >
                <span style={{ marginRight: '8px' }}>
                  {isLiked ? '❤️' : '🤍'}
                </span>
                {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
              </button>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#6c757d'
              }}>
                <span>💬</span>
                {post.commentsCount || 0} {post.commentsCount === 1 ? 'Comment' : 'Comments'}
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              Share this post: 
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#667eea', 
                  cursor: 'pointer',
                  marginLeft: '8px'
                }}
              >
                📋 Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="card" style={{ 
          padding: '24px', 
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <img
              src={post.author.profilePicture || `https://ui-avatars.com/api/?name=${post.author.username}&background=667eea&color=fff`}
              alt={post.author.username}
              className="avatar avatar-lg"
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '8px' 
              }}>
                About {post.author.username}
              </h4>
              <p style={{ 
                color: '#6c757d', 
                marginBottom: '16px',
                lineHeight: '1.6'
              }}>
                {post.author.bio || 'This author hasn\'t written a bio yet.'}
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px',
                flexWrap: 'wrap'
              }}>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <strong>{post.author.postsCount || 0}</strong> posts
                </div>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <strong>{post.author.followersCount || 0}</strong> followers
                </div>
                <Link
                  to={`/user/${post.author.username}`}
                  className="btn btn-sm btn-outline"
                  style={{ textDecoration: 'none' }}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection postId={post._id} />
      </article>
    </div>
  );
};

export default PostDetail;