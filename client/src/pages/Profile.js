import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    profilePicture: user?.profilePicture || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await updateProfile(formData);
    
    if (result.success) {
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const cancelEdit = () => {
    setFormData({
      username: user?.username || '',
      bio: user?.bio || '',
      profilePicture: user?.profilePicture || ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

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
              <Link to="/create" className="btn" style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                Write New Post
              </Link>
              <button
                onClick={() => setEditing(true)}
                className="btn"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal/Form */}
      {editing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="form-container" style={{ 
            maxWidth: '500px', 
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 className="form-title">Edit Profile</h2>

            {error && <div className="error-message">{error}</div>}
          
            {success && <div className="success-message">{success}</div>}
            

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                  rows={4}
                />
                <small style={{ color: '#6c757d', fontSize: '13px' }}>
                  {formData.bio.length}/500 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                <input
                  type="url"
                  id="profilePicture"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/your-photo.jpg"
                />
                {formData.profilePicture && (
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <img 
                      src={formData.profilePicture} 
                      alt="Profile preview"
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #e9ecef'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                justifyContent: 'flex-end' 
              }}>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        margin: '40px 0',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Link to="/create" className="card" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          padding: '24px',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✏️</div>
          <h3 style={{ marginBottom: '8px', color: '#495057' }}>Write a Post</h3>
          <p style={{ color: '#6c757d', margin: 0 }}>
            Share your thoughts and stories with the world
          </p>
        </Link>

        <Link to={`/user/${user.username}`} className="card" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          padding: '24px',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
          <h3 style={{ marginBottom: '8px', color: '#495057' }}>View Public Profile</h3>
          <p style={{ color: '#6c757d', margin: 0 }}>
            See how others view your profile and posts
          </p>
        </Link>

        <Link to="/notifications" className="card" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          padding: '24px',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
          <h3 style={{ marginBottom: '8px', color: '#495057' }}>Notifications</h3>
          <p style={{ color: '#6c757d', margin: 0 }}>
            Stay updated with likes, comments, and follows
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div style={{ maxWidth: '800px', margin: '40px auto 0' }}>
        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '16px', color: '#495057' }}>📊 Your Dashboard</h3>
          <p style={{ color: '#6c757d', marginBottom: '24px' }}>
            Here's a quick overview of your blogging journey
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '24px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                {user.postsCount || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>
                Total Posts
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#28a745' }}>
                {user.followersCount || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>
                Followers
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#17a2b8' }}>
                {user.followingCount || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>
                Following
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffc107' }}>
                {new Date(user.createdAt).getFullYear()}
              </div>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>
                Member Since
              </div>
            </div>
          </div>

          <div style={{ 
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #e9ecef'
          }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>🎯 Quick Tips</h4>
            <ul style={{ 
              textAlign: 'left',
              margin: 0, 
              paddingLeft: '20px', 
              color: '#6c757d',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              <li>Write consistently to grow your audience</li>
              <li>Engage with other writers by commenting on their posts</li>
              <li>Use relevant tags to help people discover your content</li>
              <li>Share your posts on social media to reach more readers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;