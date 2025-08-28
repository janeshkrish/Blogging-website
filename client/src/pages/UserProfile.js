import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostCard from '../components/Posts/PostCard';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (username) {
      fetchUser();
      fetchUserPosts();
    }
  }, [username]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${username}`);
      setUser(response.data.user);
      setIsFollowing(response.data.isFollowing || false);
    } catch (error) {
      setError(error.response?.data?.message || 'User not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (pageNum = 1) => {
    try {
      setPostsLoading(pageNum === 1);
      const response = await axios.get(`/users/${username}/posts?page=${pageNum}&limit=10`);
      
      if (pageNum === 1) {
        setPosts(response.data.posts);
      } else {
        setPosts(prev => [...prev, ...response.data.posts]);
      }
      
      setHasMore(pageNum < response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      alert('Please login to follow users');
      return;
    }

    setFollowLoading(true);
    try {
      const response = await axios.post(`/follow/${user._id}`);
      setIsFollowing(response.data.isFollowing);
      
      // Update follower count
      setUser(prev => ({
        ...prev,
        followersCount: prev.followersCount + (response.data.isFollowing ? 1 : -1)
      }));
    } catch (error) {
      console.error('Failed to follow/unfollow user:', error);
      alert('Failed to follow/unfollow user. Please try again.');
    } finally {
      setFollowLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchUserPosts(page + 1);
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>😕</div>
        <h2 style={{ marginBottom: '16px', color: '#495057' }}>User Not Found</h2>
        <p style={{ color: '#6c757d', marginBottom: '24px' }}>
          The user you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser._id === user._id;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="container">
          <div className="profile-info">
            <img
              src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
              alt={user.username}
              className="profile-avatar"
            />
            <h1 className="profile-name">{user.username}</h1>
            <p className="profile-bio">
              {user.bio || 'No bio available'}
            </p>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-number">{user.postsCount || 0}</span>
                <span className="profile-stat-label">Posts</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-number">{user.followersCount || 0}</span>
                <span className="profile-stat-label">Followers</span>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-number">{user.followingCount || 0}</span>
                <span className="profile-stat-label">Following</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {isOwnProfile ? (
                <>
                  <Link to="/profile" className="btn" style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    color: 'white',
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    Edit Profile
                  </Link>
                  <Link to="/create" className="btn" style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    color: 'white',
                    textDecoration: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    Write New Post
                  </Link>
                </>
              ) : (
                currentUser && (
                  <button
                    onClick={handleFollow}
                    className="btn"
                    disabled={followLoading}
                    style={{ 
                      background: isFollowing 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(255, 255, 255, 0.2)',
                      color: isFollowing ? '#667eea' : 'white',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      minWidth: '100px'
                    }}
                  >
                    {followLoading ? '...' : (isFollowing ? 'Following' : 'Follow')}
                  </button>
                )
              )}
            </div>

            <div style={{ 
              fontSize: '14px', 
              opacity: 0.8, 
              marginTop: '16px' 
            }}>
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div style={{ maxWidth: '800px', margin: '40px auto 0' }}>
        <div style={{ 
          borderBottom: '2px solid #e9ecef', 
          marginBottom: '32px' 
        }}>
          <nav style={{ display: 'flex', gap: '32px' }}>
            <button
              onClick={() => setActiveTab('posts')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: activeTab === 'posts' ? '#667eea' : '#6c757d',
                borderBottom: activeTab === 'posts' ? '2px solid #667eea' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Posts ({user.postsCount || 0})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: activeTab === 'about' ? '#667eea' : '#6c757d',
                borderBottom: activeTab === 'about' ? '2px solid #667eea' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              About
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div>
            {postsLoading && page === 1 ? (
              <div className="loading">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6c757d'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
                <h3 style={{ marginBottom: '12px', color: '#495057' }}>
                  {isOwnProfile ? 'You haven\'t written any posts yet' : `${user.username} hasn't written any posts yet`}
                </h3>
                <p>
                  {isOwnProfile 
                    ? 'Start sharing your thoughts and stories with the world!' 
                    : 'Check back later for new content.'
                  }
                </p>
                {isOwnProfile && (
                  <Link to="/create" className="btn btn-primary" style={{ 
                    textDecoration: 'none',
                    marginTop: '16px'
                  }}>
                    Write Your First Post
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gap: '24px' }}>
                  {posts.map((post) => (
                    <PostCard 
                      key={post._id} 
                      post={post}
                      onUpdate={(updatedPost) => {
                        setPosts(prev => prev.map(p => 
                          p._id === updatedPost._id ? updatedPost : p
                        ));
                      }}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-outline"
                      disabled={postsLoading}
                    >
                      {postsLoading ? 'Loading...' : 'Load More Posts'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '24px', color: '#495057' }}>
              About {user.username}
            </h3>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Bio
              </h4>
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>
                {user.bio || 'This user hasn\'t written a bio yet.'}
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Statistics
                </h4>
                <div style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.6' }}>
                  <div>📝 {user.postsCount || 0} posts published</div>
                  <div>👥 {user.followersCount || 0} followers</div>
                  <div>➡️ Following {user.followingCount || 0} users</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  Member Info
                </h4>
                <div style={{ color: '#6c757d', fontSize: '14px', lineHeight: '1.6' }}>
                  <div>📅 Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                  <div>🎭 Role: {user.role === 'admin' ? 'Administrator' : 'Writer'}</div>
                </div>
              </div>
            </div>

            {!isOwnProfile && currentUser && (
              <div style={{ 
                borderTop: '1px solid #e9ecef',
                paddingTop: '24px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Connect with {user.username}
                </h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleFollow}
                    className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                    disabled={followLoading}
                  >
                    {followLoading ? 'Loading...' : (isFollowing ? 'Following' : 'Follow')}
                  </button>
                  <Link
                    to={`/search?author=${user.username}`}
                    className="btn btn-outline"
                    style={{ textDecoration: 'none' }}
                  >
                    View All Posts
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;