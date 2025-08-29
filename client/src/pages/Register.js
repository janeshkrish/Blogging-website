import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }

    const result = await register(formData.username, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="container" style={{ 
      minHeight: 'calc(100vh - 200px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className="form-container" style={{ width: '100%', maxWidth: '550px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>🚀</div>
          <h1 className="form-title">Join BlogSphere</h1>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            Start your creative journey and connect with millions of readers
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Creator Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Choose your unique username"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_]+"
              title="Username can only contain letters, numbers, and underscores"
            />
            <small style={{ color: '#6b7280', fontSize: '14px' }}>
              3-30 characters, letters, numbers, and underscores only
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Create a strong password"
              required
              minLength={6}
            />
            <small style={{ color: '#6b7280', fontSize: '14px' }}>
              At least 6 characters long
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginBottom: '24px' }}
          >
            {loading ? '✨ Creating your account...' : '🚀 Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#10b981', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Features Preview */}
        <div style={{
          marginTop: '40px',
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(16, 185, 129, 0.3)'
        }}>
          <h4 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            marginBottom: '20px',
            color: '#064e3b'
          }}>
            🌟 What awaits you:
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '24px', 
            color: '#065f46',
            fontSize: '15px',
            lineHeight: '1.8'
          }}>
            <li style={{ marginBottom: '8px' }}>✍️ Advanced writing tools and editor</li>
            <li style={{ marginBottom: '8px' }}>📊 Detailed analytics and insights</li>
            <li style={{ marginBottom: '8px' }}>💰 Monetization opportunities</li>
            <li style={{ marginBottom: '8px' }}>🌐 Global community of creators</li>
            <li style={{ marginBottom: '8px' }}>🔔 Real-time engagement notifications</li>
            <li>🚀 SEO optimization and growth tools</li>
          </ul>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          paddingTop: '24px',
          borderTop: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <Link 
            to="/"
            style={{ 
              color: '#6b7280', 
              textDecoration: 'none',
              fontSize: '15px'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;