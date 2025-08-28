import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '40px 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              BlogApp
            </h3>
            <p style={{ 
              color: '#bdc3c7', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              A modern blogging platform where writers share their stories, 
              connect with readers, and build communities around their ideas.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ 
                color: '#bdc3c7', 
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>📧</a>
              <a href="#" style={{ 
                color: '#bdc3c7', 
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>🐦</a>
              <a href="#" style={{ 
                color: '#bdc3c7', 
                fontSize: '20px',
                transition: 'color 0.2s ease'
              }}>📱</a>
            </div>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: 'white'
            }}>
              Platform
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  How it works
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Features
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: 'white'
            }}>
              Resources
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Writing Guide
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Community Guidelines
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px',
              color: 'white'
            }}>
              Legal
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Terms of Service
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: '#bdc3c7', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}>
                  DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ 
            color: '#bdc3c7', 
            margin: 0,
            fontSize: '14px'
          }}>
            © 2024 BlogApp. All rights reserved. Made with ❤️ for writers everywhere.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '24px',
            fontSize: '14px'
          }}>
            <a href="#" style={{ 
              color: '#bdc3c7', 
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Status
            </a>
            <a href="#" style={{ 
              color: '#bdc3c7', 
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Blog
            </a>
            <a href="#" style={{ 
              color: '#bdc3c7', 
              textDecoration: 'none',
              transition: 'color 0.2s ease'
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