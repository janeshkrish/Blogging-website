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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '24px',
          padding: '80px 48px',
          textAlign: 'center',
          marginBottom: '64px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: '800', 
              marginBottom: '24px',
              lineHeight: '1.1',
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em'
            }}>
              Craft Your Story
            </h1>
            <p style={{ 
              fontSize: '22px', 
              marginBottom: '40px', 
              opacity: 0.9,
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Join a vibrant community of storytellers, thought leaders, and creatives 
              sharing their unique perspectives with the world.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn" style={{ 
                background: 'white', 
                color: '#667eea', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '16px 32px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
              }}>
                ✨ Start Your Journey
              </Link>
              <Link to="/search" className="btn btn-outline" style={{ 
                color: 'white', 
                borderColor: 'white',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)'
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.4
          }}></div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 320px', 
        gap: '48px',
        alignItems: 'flex-start'
      }}>
        {/* Main Content */}
        <div>
          {/* Sort Options */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#1a202c',
              fontFamily: 'Playfair Display, serif',
              margin: 0
            }}>
              Featured Stories
            </h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline'}`}
              >
                🕒 Latest
              </button>
              <button
                onClick={() => handleSortChange('likesCount')}
                className={`btn btn-sm ${sortBy === 'likesCount' ? 'btn-primary' : 'btn-outline'}`}
              >
                ❤️ Popular
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
          <div style={{ display: 'grid', gap: '32px' }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                color: '#718096'
              }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>📝</div>
                <h3 style={{ 
                  marginBottom: '16px', 
                  color: '#4a5568',
                  fontSize: '24px',
                  fontFamily: 'Playfair Display, serif'
                }}>No stories yet</h3>
                <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                  Be the first to share your unique perspective!
                </p>
                {user && (
                  <Link to="/create" className="btn btn-primary" style={{ 
                    textDecoration: 'none',
                    padding: '16px 32px'
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
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-outline"
                      disabled={loading}
                      style={{ padding: '16px 32px' }}
                    >
                      {loading ? '⏳ Loading...' : '📚 Load More Stories'}
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
            <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                  alt={user.username}
                  className="avatar avatar-lg"
                />
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '18px', 
                    fontWeight: '700',
                    color: '#1a202c',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    Welcome back, {user.username}! 👋
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#718096' }}>
                    Ready to share your next story?
                  </p>
                </div>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center',
                padding: '16px'
              }}>
                ✨ Create New Story
              </Link>
            </div>
          )}

          {/* Trending Tags */}
          <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: '#1a202c',
              fontFamily: 'Playfair Display, serif'
            }}>
              🔥 Trending Topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {trendingTags.length === 0 ? (
                <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
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
          <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: '#1a202c',
              fontFamily: 'Playfair Display, serif'
            }}>
              💡 Writing Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '24px', 
              color: '#718096',
              fontSize: '14px',
              lineHeight: '1.7'
            }}>
              <li style={{ marginBottom: '10px' }}>✨ Craft compelling headlines that spark curiosity</li>
              <li style={{ marginBottom: '10px' }}>🎯 Tell authentic stories that resonate deeply</li>
              <li style={{ marginBottom: '10px' }}>🖼️ Use visuals to enhance your narrative</li>
              <li>🤝 Build connections through meaningful engagement</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;