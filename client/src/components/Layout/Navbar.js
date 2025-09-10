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
        <div className="navbar-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0' }}>
          <Link to="/" className="navbar-brand">
            WriteFlow
          </Link>
          
          <div className="navbar-desktop" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {/* Desktop Navigation */}
            <ul className="navbar-nav" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  📖 Stories
                </Link>
              </li>
              <li>
                <Link 
                  to="/search" 
                  className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                >
                  🔍 Search
                </Link>
              </li>
              
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/create" 
                      className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                    >
                      ✍️ Create
                    </Link>
                  </li>
                  <li style={{ position: 'relative' }}>
                    <Link 
                      to="/notifications" 
                      className={`nav-link ${isActive('/notifications') ? 'active' : ''}`}
                      style={{ position: 'relative' }}
                    >
                      🔔 Alerts
                      {unreadCount > 0 && (
                        <span 
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)'
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
                        src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`}
                        alt={user.username}
                        className="avatar avatar-sm"
                        style={{ marginRight: '12px' }}
                      />
                      Account
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
                      🚪 Exit
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
                      🔑 Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="btn btn-primary"
                      style={{ 
                        textDecoration: 'none',
                        padding: '14px 28px',
                        borderRadius: '16px'
                      }}
                    >
                      🚀 Get Started
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
                fontSize: '32px',
                cursor: 'pointer',
                color: '#065f46',
                padding: '10px',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  📖 Stories
                </Link>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <Link 
                  to="/search" 
                  className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔍 Search
                </Link>
              </li>
              
              {user ? (
                <>
                  <li style={{ marginBottom: '16px' }}>
                    <Link 
                      to="/create" 
                      className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✍️ Create
                    </Link>
                  </li>
                  <li style={{ marginBottom: '16px' }}>
                    <Link 
                      to="/notifications" 
                      className={`nav-link ${isActive('/notifications') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      🔔 Alerts
                      {unreadCount > 0 && (
                        <span className="badge badge-primary">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li style={{ marginBottom: '16px' }}>
                    <Link 
                      to="/profile" 
                      className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img 
                        src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`}
                        alt={user.username}
                        className="avatar avatar-sm"
                        style={{ marginRight: '12px' }}
                      />
                      Account
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
                      🚪 Exit
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ marginBottom: '16px' }}>
                    <Link 
                      to="/login" 
                      className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🔑 Login
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
                        padding: '18px',
                        borderRadius: '16px'
                      }}
                    >
                      🚀 Get Started
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