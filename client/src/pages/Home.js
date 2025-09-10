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
      <div className="container" style={{ paddingTop: '60px' }}>
        <div style={{ display: 'grid', gap: '32px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="skeleton skeleton-avatar"></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: '140px' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '100px' }}></div>
                </div>
              </div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      {/* Hero Section */}
      {!user && (
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          color: 'white',
          borderRadius: '24px',
          padding: '80px 60px',
          textAlign: 'center',
          marginBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: '700', 
              marginBottom: '24px',
              lineHeight: '1.1',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Where Ideas Flow Into Stories
            </h1>
            <p style={{ 
              fontSize: '20px', 
              marginBottom: '40px', 
              opacity: 0.9,
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              fontFamily: 'Merriweather, serif'
            }}>
              The modern platform for writers and storytellers. Share your voice, 
              connect with readers, and bring your stories to life.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn" style={{ 
                background: 'white', 
                color: '#6366f1', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '16px 32px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)'
              }}>
                🚀 Start Writing
              </Link>
              <Link to="/search" className="btn btn-outline" style={{ 
                color: 'white', 
                borderColor: 'white',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                backdropFilter: 'blur(15px)',
                background: 'rgba(255, 255, 255, 0.15)'
              }}>
                📖 Read Stories
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.2
          }}></div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 380px', 
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
              fontWeight: '700', 
              color: '#f1f5f9',
              fontFamily: 'Space Grotesk, sans-serif',
              margin: 0
            }}>
              📚 Latest Stories
            </h2>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline'}`}
              >
                🕒 Recent
              </button>
              <button
                onClick={() => handleSortChange('likesCount')}
                className={`btn btn-sm ${sortBy === 'likesCount' ? 'btn-primary' : 'btn-outline'}`}
              >
                ❤️ Loved
              </button>
              <button
                onClick={() => handleSortChange('views')}
                className={`btn btn-sm ${sortBy === 'views' ? 'btn-primary' : 'btn-outline'}`}
              >
                👁️ Viewed
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: 'grid', gap: '32px' }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 32px',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '80px', marginBottom: '32px' }}>📖</div>
                <h3 style={{ 
                  marginBottom: '24px', 
                  color: '#f1f5f9',
                  fontSize: '28px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}>No stories yet</h3>
                <p style={{ fontSize: '18px', marginBottom: '32px' }}>
                  Be the first to share your story with the world!
                </p>
                {user && (
                  <Link to="/create" className="btn btn-primary" style={{ 
                    textDecoration: 'none',
                    padding: '16px 32px'
                  }}>
                    ✍️ Write Your First Story
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
                      style={{ padding: '16px 32px' }}
                    >
                      {loading ? '⏳ Loading...' : '📚 Load More'}
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
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`}
                  alt={user.username}
                  className="avatar avatar-lg"
                />
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: '#f1f5f9',
                    fontFamily: 'Space Grotesk, sans-serif'
                  }}>
                    Welcome back, {user.username}! 👋
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
                    Ready to share your story?
                  </p>
                </div>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center',
                padding: '16px'
              }}>
                ✍️ Create Story
              </Link>
            </div>
          )}

          {/* Trending Tags */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: '#f1f5f9',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              🏷️ Popular Tags
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {trendingTags.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  No trending topics yet
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
                      fontSize: '12px', 
                      opacity: 0.7 
                    }}>
                      ({tag.count})
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Creator Spotlight */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: '#f1f5f9',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              ⭐ Featured Writer
            </h3>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Featured Creator"
                  className="avatar avatar-md"
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#f1f5f9' }}>
                    Alex Rivera
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Storyteller & Creator
                  </p>
                </div>
              </div>
              <p style={{ 
                color: '#cbd5e1', 
                fontSize: '14px', 
                lineHeight: '1.6',
                margin: '0 0 12px 0'
              }}>
                "Crafting stories that inspire and connect. Every word matters in the flow of ideas."
              </p>
              <Link to="/user/alexrivera" className="btn btn-sm btn-outline" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center'
              }}>
                Follow Alex
              </Link>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: '#f1f5f9',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              💡 Writing Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px', 
              color: '#cbd5e1',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '10px' }}>✍️ Write with authenticity and passion</li>
              <li style={{ marginBottom: '10px' }}>📖 Read widely to expand your perspective</li>
              <li style={{ marginBottom: '10px' }}>🎯 Focus on one clear message per story</li>
              <li style={{ marginBottom: '10px' }}>💬 Engage genuinely with your readers</li>
              <li>🔄 Edit ruthlessly, publish confidently</li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="sidebar-card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '16px',
              color: '#f1f5f9',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              📬 Story Updates
            </h3>
            <p style={{ 
              color: '#cbd5e1', 
              fontSize: '14px', 
              marginBottom: '16px',
              lineHeight: '1.6'
            }}>
              Get the best stories and writing insights delivered weekly.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input"
                style={{ 
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '13px'
                }}
              />
              <button className="btn btn-primary" style={{ 
                padding: '12px 20px',
                fontSize: '13px'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;