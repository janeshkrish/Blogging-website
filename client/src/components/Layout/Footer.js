import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
      color: 'white',
      padding: '60px 0 40px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '800',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Playfair Display, serif'
            }}>
              ✨ StoryHub
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: '1.7',
              marginBottom: '24px',
              fontSize: '15px'
            }}>
              A vibrant community where storytellers, creators, and thought leaders 
              share their unique perspectives and connect with engaged readers worldwide.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '24px',
                transition: 'all 0.3s ease',
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>📧</a>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '24px',
                transition: 'all 0.3s ease',
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>🐦</a>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '24px',
                transition: 'all 0.3s ease',
                padding: '8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>📱</a>
            </div>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white',
              fontFamily: 'Playfair Display, serif'
            }}>
              🚀 Platform
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  How it works
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Features
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white',
              fontFamily: 'Playfair Display, serif'
            }}>
              📚 Resources
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Writing Guide
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Community Guidelines
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white',
              fontFamily: 'Playfair Display, serif'
            }}>
              ⚖️ Legal
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Terms of Service
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#667eea';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            margin: 0,
            fontSize: '15px'
          }}>
            © 2025 StoryHub. All rights reserved. Made with ❤️ for storytellers everywhere.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '32px',
            fontSize: '15px'
          }}>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#667eea';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Status
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#667eea';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Blog
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#667eea';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Changelog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;