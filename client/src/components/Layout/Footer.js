import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
      color: 'white',
      padding: '80px 0 50px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '50px',
          marginBottom: '50px'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '32px', 
              fontWeight: '800',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              WriteFlow
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: '1.8',
              marginBottom: '28px',
              fontSize: '16px',
              fontFamily: 'Merriweather, serif'
            }}>
              Where ideas flow into stories. The modern platform for writers, creators, 
              and storytellers to share their voice with the world.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '28px',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}>📱</a>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '28px',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}>🌐</a>
              <a href="#" style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: '28px',
                transition: 'all 0.3s ease',
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)'
              }} onMouseOver={(e) => {
                e.target.style.color = 'white';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }} onMouseOut={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}>💬</a>
            </div>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '22px', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              🚀 Platform
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Advanced Editor
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Story Analytics
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Reader Community
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Publishing Tools
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '22px', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              📚 Learn
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Writing Academy
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Story Craft
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Writer Support
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Developer API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '22px', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif'
            }}>
              💡 Grow
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Build Audience
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Earn Revenue
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Story Discovery
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#a5b4fc';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Pro Features
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            margin: 0,
            fontSize: '16px'
          }}>
            © 2025 WriteFlow. All rights reserved. Crafted with 💜 for storytellers worldwide.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '36px',
            fontSize: '16px'
          }}>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#a5b4fc';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#a5b4fc';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Terms of Service
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#a5b4fc';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Writer Program
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;