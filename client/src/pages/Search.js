import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/Posts/PostCard';
import axios from 'axios';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [selectedAuthor, setSelectedAuthor] = useState(searchParams.get('author') || '');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [trendingTags, setTrendingTags] = useState([]);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const tag = searchParams.get('tag') || '';
    const author = searchParams.get('author') || '';
    
    setSearchQuery(query);
    setSelectedTag(tag);
    setSelectedAuthor(author);
    
    if (query || tag || author) {
      performSearch(query, tag, author, 1);
    } else {
      fetchTrendingTags();
    }
  }, [searchParams]);

  const fetchTrendingTags = async () => {
    try {
      const response = await axios.get('/posts/tags/trending?limit=20');
      setTrendingTags(response.data.tags);
    } catch (error) {
      console.error('Failed to fetch trending tags:', error);
    }
  };

  const performSearch = async (query = searchQuery, tag = selectedTag, author = selectedAuthor, pageNum = 1) => {
    if (!query && !tag && !author) return;

    setLoading(pageNum === 1);
    try {
      let postsResponse, usersResponse;
      
      // Search posts
      const postsParams = new URLSearchParams();
      if (query) postsParams.append('search', query);
      if (tag) postsParams.append('tag', tag);
      if (author) postsParams.append('author', author);
      postsParams.append('page', pageNum);
      postsParams.append('limit', 10);

      postsResponse = await axios.get(`/posts?${postsParams}`);

      // Search users (only on first page and if there's a text query)
      if (pageNum === 1 && query && activeTab === 'users') {
        usersResponse = await axios.get(`/users/search/${encodeURIComponent(query)}`);
        setUsers(usersResponse.data.users);
      }

      if (pageNum === 1) {
        setPosts(postsResponse.data.posts);
      } else {
        setPosts(prev => [...prev, ...postsResponse.data.posts]);
      }

      setHasMore(pageNum < postsResponse.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedTag) params.set('tag', selectedTag);
    if (selectedAuthor) params.set('author', selectedAuthor);
    
    setSearchParams(params);
    setPage(1);
    performSearch(searchQuery, selectedTag, selectedAuthor, 1);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchQuery('');
    setSelectedAuthor('');
    const params = new URLSearchParams();
    params.set('tag', tag);
    setSearchParams(params);
    performSearch('', tag, '', 1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag('');
    setSelectedAuthor('');
    setSearchParams({});
    setPosts([]);
    setUsers([]);
    fetchTrendingTags();
  };

  const handleLoadMore = () => {
    performSearch(searchQuery, selectedTag, selectedAuthor, page + 1);
  };

  const hasActiveFilters = searchQuery || selectedTag || selectedAuthor;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Search Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Discover Stories
        </h1>
        <p style={{ color: '#6c757d', fontSize: '18px' }}>
          Find interesting posts, authors, and topics
        </p>
      </div>

      {/* Search Form */}
      <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
        <form onSubmit={handleSearch}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto', 
            gap: '16px',
            alignItems: 'end'
          }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="search" className="form-label">Search</label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                placeholder="Search posts, titles, or content..."
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : '🔍 Search'}
            </button>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              marginTop: '16px',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: '#6c757d', fontWeight: '500' }}>
                Active filters:
              </span>
              
              {searchQuery && (
                <span className="badge badge-primary">
                  Search: "{searchQuery}"
                </span>
              )}
              
              {selectedTag && (
                <span className="badge badge-primary">
                  Tag: #{selectedTag}
                </span>
              )}
              
              {selectedAuthor && (
                <span className="badge badge-primary">
                  Author: {selectedAuthor}
                </span>
              )}
              
              <button
                type="button"
                onClick={handleClearFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Results or Trending Tags */}
      {hasActiveFilters ? (
        <div>
          {/* Tabs */}
          {searchQuery && (
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
                  Posts ({posts.length})
                </button>
                <button
                  onClick={() => {
                    setActiveTab('users');
                    if (users.length === 0 && searchQuery) {
                      performSearch(searchQuery, '', '', 1);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: activeTab === 'users' ? '#667eea' : '#6c757d',
                    borderBottom: activeTab === 'users' ? '2px solid #667eea' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Users ({users.length})
                </button>
              </nav>
            </div>
          )}

          {/* Search Results */}
          {activeTab === 'posts' && (
            <div>
              {loading && page === 1 ? (
                <div className="loading">Searching posts...</div>
              ) : posts.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6c757d'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
                  <h3 style={{ marginBottom: '12px', color: '#495057' }}>No posts found</h3>
                  <p>Try different keywords or browse trending tags below</p>
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
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Load More Results'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'users' && searchQuery && (
            <div>
              {users.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6c757d'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>👤</div>
                  <h3 style={{ marginBottom: '12px', color: '#495057' }}>No users found</h3>
                  <p>No users match your search criteria</p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                  gap: '24px' 
                }}>
                  {users.map((user) => (
                    <div key={user._id} className="card" style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <img
                          src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                          alt={user.username}
                          className="avatar avatar-lg"
                        />
                        <div>
                          <h3 style={{ margin: 0, fontSize: '18px' }}>
                            <a 
                              href={`/user/${user.username}`}
                              style={{ color: '#495057', textDecoration: 'none' }}
                            >
                              {user.username}
                            </a>
                          </h3>
                          <div style={{ color: '#6c757d', fontSize: '14px' }}>
                            {user.followersCount || 0} followers
                          </div>
                        </div>
                      </div>
                      <p style={{ 
                        color: '#6c757d', 
                        fontSize: '14px', 
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {user.bio || 'No bio available'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Trending Tags */
        <div>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '24px',
            color: '#212529'
          }}>
            🔥 Trending Topics
          </h2>

          {trendingTags.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6c757d'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏷️</div>
              <h3 style={{ marginBottom: '12px', color: '#495057' }}>No trending tags yet</h3>
              <p>Start writing posts with tags to see trending topics here</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '16px' 
            }}>
              {trendingTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                  className="card"
                  style={{
                    padding: '20px',
                    background: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#667eea',
                    marginBottom: '8px'
                  }}>
                    #{tag.name}
                  </div>
                  <div style={{ 
                    color: '#6c757d', 
                    fontSize: '14px' 
                  }}>
                    {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#495057' }}>
              💡 Search Tips
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              textAlign: 'left',
              fontSize: '14px',
              color: '#6c757d'
            }}>
              <div>
                <strong>Keywords:</strong> Search for specific words in titles and content
              </div>
              <div>
                <strong>Tags:</strong> Click trending tags or search by specific topics
              </div>
              <div>
                <strong>Authors:</strong> Find posts by specific writers
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;