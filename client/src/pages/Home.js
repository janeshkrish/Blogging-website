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
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          borderRadius: '36px',
          padding: '140px 100px',
          textAlign: 'center',
          marginBottom: '100px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 35px 70px rgba(16, 185, 129, 0.4)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '72px', 
              fontWeight: '800', 
              marginBottom: '32px',
              lineHeight: '1.1',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Your Stories Matter
            </h1>
            <p style={{ 
              fontSize: '26px', 
              marginBottom: '56px', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto 56px',
              lineHeight: '1.7',
              fontFamily: 'Crimson Text, serif'
            }}>
              Join millions of creators, thought leaders, and storytellers sharing their 
              unique perspectives. Build your audience, monetize your content, and make an impact.
            </p>
            <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn" style={{ 
                background: 'white', 
                color: '#10b981', 
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '700',
                padding: '20px 40px',
                borderRadius: '20px',
                boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)'
              }}>
                ✨ Start Creating
              </Link>
              <Link to="/search" className="btn btn-outline" style={{ 
                color: 'white', 
                borderColor: 'white',
                textDecoration: 'none',
                padding: '20px 40px',
                borderRadius: '20px',
                backdropFilter: 'blur(15px)',
                background: 'rgba(255, 255, 255, 0.15)'
              }}>
                🔍 Discover Stories
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M60 35c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25zm0 6c-10.493 0-19 8.507-19 19s8.507 19 19 19 19-8.507 19-19-8.507-19-19-19z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.4
          }}></div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 450px', 
        gap: '80px',
        alignItems: 'flex-start'
      }}>
        {/* Main Content */}
        <div>
          {/* Sort Options */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '28px'
          }}>
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: '800', 
              color: '#064e3b',
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              ✨ Featured Stories
            </h2>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline'}`}
              >
                🆕 Latest
              </button>
              <button
                onClick={() => handleSortChange('likesCount')}
                className={`btn btn-sm ${sortBy === 'likesCount' ? 'btn-primary' : 'btn-outline'}`}
              >
                💖 Popular
              </button>
              <button
                onClick={() => handleSortChange('views')}
                className={`btn btn-sm ${sortBy === 'views' ? 'btn-primary' : 'btn-outline'}`}
              >
                🔥 Trending
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: 'grid', gap: '40px' }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '120px 32px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '120px', marginBottom: '40px' }}>✨</div>
                <h3 style={{ 
                  marginBottom: '24px', 
                  color: '#065f46',
                  fontSize: '32px',
                  fontFamily: 'Inter, sans-serif'
                }}>No stories yet</h3>
                <p style={{ fontSize: '20px', marginBottom: '40px' }}>
                  Be the first to share your amazing story with the world!
                </p>
                {user && (
                  <Link to="/create" className="btn btn-primary" style={{ 
                    textDecoration: 'none',
                    padding: '20px 40px'
                  }}>
                    ✨ Create Your First Story
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
                  <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-outline"
                      disabled={loading}
                      style={{ padding: '20px 40px' }}
                    >
                      {loading ? '✨ Loading Magic...' : '📚 Load More Stories'}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=10b981&color=fff`}
                  alt={user.username}
                  className="avatar avatar-lg"
                />
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '22px', 
                    fontWeight: '800',
                    color: '#064e3b',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Welcome back, {user.username}! ✨
                  </h4>
                  <p style={{ margin: 0, fontSize: '16px', color: '#6b7280' }}>
                    Ready to inspire the world?
                  </p>
                </div>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center',
                padding: '20px'
              }}>
                ✍️ Write New Story
              </Link>
            </div>
          )}

          {/* Trending Tags */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '28px',
              color: '#064e3b',
              fontFamily: 'Inter, sans-serif'
            }}>
              🔥 Trending Topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {trendingTags.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
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
                      marginLeft: '8px', 
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
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '28px',
              color: '#064e3b',
              fontFamily: 'Inter, sans-serif'
            }}>
              🌟 Creator Spotlight
            </h3>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Featured Creator"
                  className="avatar avatar-md"
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#064e3b' }}>
                    Sarah Chen
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                    Tech Innovator & Writer
                  </p>
                </div>
              </div>
              <p style={{ 
                color: '#065f46', 
                fontSize: '15px', 
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                "Building the future through code and creativity. Join me on this incredible journey!"
              </p>
              <Link to="/user/sarahchen" className="btn btn-sm btn-outline" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center'
              }}>
                Follow Sarah
              </Link>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="sidebar-card">
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '28px',
              color: '#064e3b',
              fontFamily: 'Inter, sans-serif'
            }}>
              💡 Creator Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '28px', 
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.8'
            }}>
              <li style={{ marginBottom: '14px' }}>✨ Craft compelling headlines that grab attention</li>
              <li style={{ marginBottom: '14px' }}>📸 Use high-quality visuals to enhance your stories</li>
              <li style={{ marginBottom: '14px' }}>🎯 Write consistently to build your audience</li>
              <li style={{ marginBottom: '14px' }}>💬 Engage with your readers through comments</li>
              <li>🚀 Share your content across social platforms</li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="sidebar-card" style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
            border: '2px solid rgba(16, 185, 129, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              marginBottom: '20px',
              color: '#064e3b',
              fontFamily: 'Inter, sans-serif'
            }}>
              📧 Stay Updated
            </h3>
            <p style={{ 
              color: '#065f46', 
              fontSize: '16px', 
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Get the best stories and creator insights delivered to your inbox weekly.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input"
                style={{ 
                  flex: 1,
                  padding: '14px 20px',
                  fontSize: '14px'
                }}
              />
              <button className="btn btn-primary" style={{ 
                padding: '14px 20px',
                fontSize: '14px'
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