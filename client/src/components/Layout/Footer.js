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
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌱 GreenBlog
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              lineHeight: '1.7',
              marginBottom: '24px',
              fontSize: '15px'
            }}>
              A sustainable blogging platform where eco-conscious writers, green innovators, 
              and environmental advocates share insights about building a better tomorrow.
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
              }}>🌍</a>
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
              }}>♻️</a>
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
              }}>🌱</a>
            </div>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              marginBottom: '20px',
              color: 'white',
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌱 Platform
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
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Sustainable Writing
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Green Features
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Community
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Eco Guidelines
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
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌿 Resources
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
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Green Writing Guide
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Sustainability Guidelines
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Eco Help Center
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Green Support
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
              fontFamily: 'Poppins, sans-serif'
            }}>
              🌍 Impact
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
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Carbon Footprint
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Sustainability Report
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Green Initiatives
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontSize: '15px'
                }} onMouseOver={(e) => {
                  e.target.style.color = '#22c55e';
                }} onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}>
                  Environmental Policy
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
            © 2025 GreenBlog. All rights reserved. Made with 🌱 for a sustainable future.
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
              e.target.style.color = '#22c55e';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Green Status
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#22c55e';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Eco Blog
            </a>
            <a href="#" style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }} onMouseOver={(e) => {
              e.target.style.color = '#22c55e';
            }} onMouseOut={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}>
              Green Updates
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;