import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/Posts/PostCard';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('createdAt');
  const [trendingTags, setTrendingTags] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts(1, sortBy);
    fetchTrendingTags();
  }, [sortBy]);

  const fetchPosts = async (pageNum, sort = sortBy) => {
    try {
      setLoading(pageNum === 1);
      const response = await axios.get(`/posts?page=${pageNum}&limit=10&sortBy=${sort}&order=desc`);
      
      if (pageNum === 1) {
        setPosts(response.data.posts);
      } else {
        setPosts(prev => [...prev, ...response.data.posts]);
      }
      
      setHasMore(pageNum < response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingTags = async () => {
    try {
      const response = await axios.get('/posts/tags/trending?limit=8');
      setTrendingTags(response.data.tags);
    } catch (error) {
      console.error('Failed to fetch trending tags:', error);
    }
  };

  const handleLoadMore = () => {
    fetchPosts(page + 1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setPage(1);
  };

  if (loading && page === 1) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'grid', gap: '24px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="skeleton skeleton-avatar"></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '80px' }}></div>
                </div>
              </div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Hero Section */}
      {!user && (
        <div style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          borderRadius: '28px',
          padding: '100px 60px',
          textAlign: 'center',
          marginBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(34, 197, 94, 0.3)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '64px', 
              fontWeight: '800', 
              marginBottom: '28px',
              lineHeight: '1.1',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Write for Tomorrow
            </h1>
            <p style={{ 
              fontSize: '24px', 
              marginBottom: '48px', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto 48px',
              lineHeight: '1.7',
              fontFamily: 'Merriweather, serif'
            }}>
              Join a sustainable community of eco-conscious writers, environmental advocates, 
              and green innovators sharing ideas for a better planet.
            </p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn" style={{ 
                background: 'white', 
                color: '#22c55e', 
                textDecoration: 'none',
                fontSize: '17px',
                fontWeight: '600',
                padding: '18px 36px',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
              }}>
                🌱 Start Growing
              </Link>
              <Link to="/search" className="btn btn-outline" style={{ 
                color: 'white', 
                borderColor: 'white',
                textDecoration: 'none',
                padding: '18px 36px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)'
              }}>
                🔍 Explore Content
              </Link>
            </div>
          </div>
          {/* Background pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.4
          }}></div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 400px', 
        gap: '60px',
        alignItems: 'flex-start'
      }}>
        {/* Main Content */}
        <div>
          {/* Sort Options */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: '#1a202c',
              fontFamily: 'Poppins, sans-serif',
              margin: 0
            }}>
              🌿 Green Stories
            </h2>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline'}`}
              >
                🌱 Fresh
              </button>
              <button
                onClick={() => handleSortChange('likesCount')}
                className={`btn btn-sm ${sortBy === 'likesCount' ? 'btn-primary' : 'btn-outline'}`}
              >
                💚 Loved
              </button>
              <button
                onClick={() => handleSortChange('views')}
                className={`btn btn-sm ${sortBy === 'views' ? 'btn-primary' : 'btn-outline'}`}
              >
                🌟 Trending
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: 'grid', gap: '36px' }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '100px 24px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '96px', marginBottom: '32px' }}>🌱</div>
                <h3 style={{ 
                  marginBottom: '20px', 
                  color: '#374151',
                  fontSize: '28px',
                  fontFamily: 'Poppins, sans-serif'
                }}>No green stories yet</h3>
                <p style={{ fontSize: '18px', marginBottom: '32px' }}>
                  Be the first to plant seeds of change with your writing!
                </p>
                {user && (
                  <Link to="/create" className="btn btn-primary" style={{ 
                    textDecoration: 'none',
                    padding: '18px 36px'
                  }}>
                    🌱 Plant Your First Story
                  </Link>
                )}
              </div>
            ) : (
              <>
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

                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-outline"
                      disabled={loading}
                      style={{ padding: '18px 36px' }}
                    >
                      {loading ? '🌱 Growing...' : '🌿 Discover More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          {/* User Welcome Card */}
          {user && (
            <div className="sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=22c55e&color=fff`}
                  alt={user.username}
                  className="avatar avatar-lg"
                />
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '20px', 
                    fontWeight: '800',
                    color: '#1a202c',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Welcome back, {user.username}! 🌱
                  </h4>
                  <p style={{ margin: 0, fontSize: '15px', color: '#6b7280' }}>
                    Ready to grow your green impact?
                  </p>
                </div>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center',
                padding: '18px'
              }}>
                🌱 Plant New Story
              </Link>
            </div>
          )}

          {/* Trending Tags */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '22px', 
              fontWeight: '800', 
              marginBottom: '24px',
              color: '#1a202c',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌟 Trending Green Topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              {trendingTags.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
                  No trending tags yet
                </p>
              ) : (
                trendingTags.map((tag) => (
                  <Link
                    key={tag.name}
                    to={`/search?tag=${tag.name}`}
                    className="post-tag"
                    style={{ textDecoration: 'none' }}
                  >
                    #{tag.name}
                    <span style={{ 
                      marginLeft: '6px', 
                      fontSize: '11px', 
                      opacity: 0.7 
                    }}>
                      ({tag.count})
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Writing Tips */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '22px', 
              fontWeight: '800', 
              marginBottom: '24px',
              color: '#1a202c',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌱 Green Writing Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '24px', 
              color: '#6b7280',
              fontSize: '15px',
              lineHeight: '1.8'
            }}>
              <li style={{ marginBottom: '12px' }}>🌿 Write about sustainable living and eco-friendly practices</li>
              <li style={{ marginBottom: '12px' }}>♻️ Share innovative green solutions and technologies</li>
              <li style={{ marginBottom: '12px' }}>🌍 Inspire environmental awareness through storytelling</li>
              <li>💚 Build a community focused on positive change</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;