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
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✍️</div>
          <h1 className="form-title">Join WriteFlow</h1>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            Begin your writing journey and share your stories
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Writer Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Choose your writer name"
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
            {loading ? '⏳ Creating account...' : '✍️ Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#6366f1', 
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
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          <h4 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            marginBottom: '20px',
            color: '#f1f5f9'
          }}>
            ✨ What you'll get:
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '24px', 
            color: '#cbd5e1',
            fontSize: '15px',
            lineHeight: '1.8'
          }}>
            <li style={{ marginBottom: '8px' }}>✍️ Beautiful writing editor</li>
            <li style={{ marginBottom: '8px' }}>📊 Story performance insights</li>
            <li style={{ marginBottom: '8px' }}>👥 Connect with readers</li>
            <li style={{ marginBottom: '8px' }}>🔔 Real-time notifications</li>
            <li style={{ marginBottom: '8px' }}>📱 Mobile-friendly platform</li>
            <li>🎨 Customizable writer profile</li>
          </ul>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          paddingTop: '24px',
          borderTop: '1px solid rgba(99, 102, 241, 0.2)'
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