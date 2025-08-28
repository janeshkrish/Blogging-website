import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import axios from 'axios';

const Notifications = () => {
  const { user } = useAuth();
  const { 
    notifications, 
    setNotifications, 
    unreadCount, 
    setUnreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotification();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async (pageNum = 1) => {
    try {
      setLoading(pageNum === 1);
      const response = await axios.get(`/notifications?page=${pageNum}&limit=20`);
      
      if (pageNum === 1) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      } else {
        setNotifications(prev => [...prev, ...response.data.notifications]);
      }
      
      setHasMore(pageNum < response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleLoadMore = () => {
    fetchNotifications(page + 1);
  };

  const formatDate = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffInSeconds = Math.floor((now - notifDate) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return notifDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow':
        return '👤';
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'mention':
        return '📢';
      default:
        return '🔔';
    }
  };

  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case 'follow':
        return `/user/${notification.sender.username}`;
      case 'like':
      case 'comment':
        // Assuming entityId is the post ID for likes and comments
        return `/post/${notification.entityId}`;
      default:
        return '#';
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              marginBottom: '8px',
              color: '#212529'
            }}>
              Notifications
            </h1>
            <p style={{ color: '#6c757d', margin: 0 }}>
              Stay updated with your latest activity
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="btn btn-outline"
            >
              Mark all as read ({unreadCount})
            </button>
          )}
        </div>

        {/* Notifications List */}
        {loading && page === 1 ? (
          <div className="loading">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔔</div>
            <h3 style={{ marginBottom: '12px', color: '#495057' }}>No notifications yet</h3>
            <p style={{ marginBottom: '24px' }}>
              When people interact with your posts, you'll see notifications here
            </p>
            <Link to="/create" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Write Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '1px', background: '#e9ecef', borderRadius: '12px', overflow: 'hidden' }}>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  style={{
                    background: notification.isRead ? 'white' : '#f8f9ff',
                    padding: '20px',
                    borderLeft: notification.isRead ? 'none' : '4px solid #667eea',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => {
                    if (!notification.isRead) {
                      handleMarkAsRead(notification._id);
                    }
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = notification.isRead ? '#f8f9fa' : '#f0f0ff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = notification.isRead ? 'white' : '#f8f9ff';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ 
                      fontSize: '24px',
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(102, 126, 234, 0.1)',
                      borderRadius: '50%'
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <img
                          src={notification.sender?.profilePicture || `https://ui-avatars.com/api/?name=${notification.sender?.username}&background=667eea&color=fff`}
                          alt={notification.sender?.username}
                          className="avatar avatar-sm"
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ 
                            margin: 0, 
                            color: '#495057',
                            fontSize: '15px',
                            lineHeight: '1.5'
                          }}>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            background: '#667eea',
                            borderRadius: '50%',
                            flexShrink: 0
                          }}></div>
                        )}
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: '13px',
                        color: '#6c757d'
                      }}>
                        <span>{formatDate(notification.createdAt)}</span>
                        
                        {getNotificationLink(notification) !== '#' && (
                          <Link
                            to={getNotificationLink(notification)}
                            style={{ 
                              color: '#667eea', 
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  onClick={handleLoadMore}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Notifications'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Notification Settings */}
        <div className="card" style={{ 
          padding: '24px', 
          marginTop: '40px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: '#495057'
          }}>
            📱 Notification Types
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            fontSize: '14px',
            color: '#6c757d'
          }}>
            <div>
              <strong style={{ color: '#495057' }}>👤 Follows:</strong> When someone follows you
            </div>
            <div>
              <strong style={{ color: '#495057' }}>❤️ Likes:</strong> When someone likes your posts
            </div>
            <div>
              <strong style={{ color: '#495057' }}>💬 Comments:</strong> When someone comments on your posts
            </div>
            <div>
              <strong style={{ color: '#495057' }}>📢 Mentions:</strong> When someone mentions you
            </div>
          </div>
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#495057'
          }}>
            💡 <strong>Tip:</strong> Notifications are delivered in real-time when you're online. 
            Click on any notification to mark it as read and navigate to the related content.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;