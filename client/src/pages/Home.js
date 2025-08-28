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
          borderRadius: '16px',
          padding: '60px 40px',
          textAlign: 'center',
          marginBottom: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Share Your Story
            </h1>
            <p style={{ 
              fontSize: '20px', 
              marginBottom: '32px', 
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Join thousands of writers sharing their thoughts, experiences, and expertise 
              with a global community of readers.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn" style={{ 
                background: 'white', 
                color: '#667eea', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Start Writing Today
              </Link>
              <Link to="/search" className="btn btn-outline" style={{ 
                color: 'white', 
                borderColor: 'white',
                textDecoration: 'none'
              }}>
                Explore Stories
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}></div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 300px', 
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Main Content */}
        <div>
          {/* Sort Options */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#212529',
              margin: 0
            }}>
              Latest Stories
            </h2>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleSortChange('createdAt')}
                className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-outline'}`}
              >
                Latest
              </button>
              <button
                onClick={() => handleSortChange('likesCount')}
                className={`btn btn-sm ${sortBy === 'likesCount' ? 'btn-primary' : 'btn-outline'}`}
              >
                Popular
              </button>
              <button
                onClick={() => handleSortChange('views')}
                className={`btn btn-sm ${sortBy === 'views' ? 'btn-primary' : 'btn-outline'}`}
              >
                Trending
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: 'grid', gap: '24px' }}>
            {posts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6c757d'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
                <h3 style={{ marginBottom: '12px', color: '#495057' }}>No posts yet</h3>
                <p>Be the first to share your story!</p>
                {user && (
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
                  <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button
                      onClick={handleLoadMore}
                      className="btn btn-outline"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More Stories'}
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
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                  alt={user.username}
                  className="avatar avatar-md"
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    Welcome back, {user.username}!
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
                    Ready to share your next story?
                  </p>
                </div>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ 
                textDecoration: 'none',
                width: '100%',
                justifyContent: 'center'
              }}>
                Write New Post
              </Link>
            </div>
          )}

          {/* Trending Tags */}
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: '#212529'
            }}>
              🔥 Trending Topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {trendingTags.length === 0 ? (
                <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
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
                      marginLeft: '4px', 
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
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: '#212529'
            }}>
              💡 Writing Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px', 
              color: '#6c757d',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '8px' }}>Use compelling headlines to grab attention</li>
              <li style={{ marginBottom: '8px' }}>Tell stories that resonate with your audience</li>
              <li style={{ marginBottom: '8px' }}>Add images to make your posts more engaging</li>
              <li>Engage with other writers in the community</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;