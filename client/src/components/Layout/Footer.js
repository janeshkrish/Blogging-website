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
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Inter, sans-serif'
            }}>
              ✨ BlogSphere
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: '1.8',
              marginBottom: '28px',
              fontSize: '16px',
              fontFamily: 'Crimson Text, serif'
            }}>
              The ultimate platform for creative minds, thought leaders, and storytellers. 
              Share your ideas, connect with readers, and build your digital presence.
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
              fontFamily: 'Inter, sans-serif'
            }}>
              ✨ Platform
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
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Creative Writing Tools
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Advanced Analytics
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Community Hub
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Publishing Guidelines
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
              fontFamily: 'Inter, sans-serif'
            }}>
              📚 Resources
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
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Writing Masterclass
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Content Strategy
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Creator Support
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
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
              fontSize: '22px', 
              fontWeight: '700', 
              marginBottom: '24px',
              color: 'white',
              fontFamily: 'Inter, sans-serif'
            }}>
              🚀 Growth
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
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Audience Building
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Monetization
                </a>
              </li>
              <li style={{ marginBottom: '14px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  SEO Optimization
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '16px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#10b981';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Premium Features
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
            © 2025 BlogSphere. All rights reserved. Crafted with ✨ for creators worldwide.
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
              e.target.style.color = '#10b981';
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
              e.target.style.color = '#10b981';
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
              e.target.style.color = '#10b981';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Creator Program
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;