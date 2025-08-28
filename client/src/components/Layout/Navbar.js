import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
          <Link to="/" className="navbar-brand">
            ✨ StoryHub
          </Link>
          
          <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Desktop Navigation */}
            <ul className="navbar-nav" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/search" 
                  className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                >
                  🔍 Discover
                </Link>
              </li>
              
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/create" 
                      className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                    >
                      ✍️ Write
                    </Link>
                  </li>
                  <li style={{ position: 'relative' }}>
                    <Link 
                      to="/notifications" 
                      className={`nav-link ${isActive('/notifications') ? 'active' : ''}`}
                      style={{ position: 'relative' }}
                    >
                      🔔 Notifications
                      {unreadCount > 0 && (
                        <span 
                          style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '22px',
                            height: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '700',
                            boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)'
                          }}
                        >
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/profile" 
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                    >
                      <img 
                        src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                        alt={user.username}
                        className="avatar avatar-sm"
                        style={{ marginRight: '10px' }}
                      />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ 
                        background: 'none', 
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                    >
                      🔑 Sign In
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="btn btn-primary"
                      style={{ 
                        textDecoration: 'none',
                        padding: '12px 24px',
                        borderRadius: '12px'
                      }}
                    >
                      ✨ Join Now
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: window.innerWidth <= 768 ? 'block' : 'none',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#4a5568',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="mobile-nav"
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏠 Home
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link 
                  to="/search" 
                  className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔍 Discover
                </Link>
              </li>
              
              {user ? (
                <>
                  <li style={{ marginBottom: '12px' }}>
                    <Link 
                      to="/create" 
                      className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✍️ Write
                    </Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link 
                      to="/notifications" 
                      className={`nav-link ${isActive('/notifications') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      🔔 Notifications
                      {unreadCount > 0 && (
                        <span className="badge badge-primary">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link 
                      to="/profile" 
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img 
                        src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=667eea&color=fff`}
                        alt={user.username}
                        className="avatar avatar-sm"
                        style={{ marginRight: '10px' }}
                      />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        width: '100%', 
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ marginBottom: '12px' }}>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🔑 Sign In
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="btn btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ 
                        textDecoration: 'none',
                        display: 'block',
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: '12px'
                      }}
                    >
                      ✨ Join Now
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;