import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

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

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
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
      <div className="form-container" style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>✨</div>
          <h1 className="form-title">Welcome Back Creator</h1>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            Sign in to continue your storytelling journey
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              autoComplete="email"
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
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginBottom: '24px' }}
          >
            {loading ? '✨ Signing you in...' : '🚀 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            New to BlogSphere?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#10b981', 
                textDecoration: 'none', 
                fontWeight: '600' 
              }}
            >
              Join our community
            </Link>
          </p>
        </div>

        {/* Demo Accounts */}
        <div style={{
          marginTop: '40px',
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(16, 185, 129, 0.2)'
        }}>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '700', 
            marginBottom: '16px',
            color: '#064e3b'
          }}>
            🎭 Try Demo Accounts
          </h4>
          <div style={{ fontSize: '14px', color: '#065f46', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>Admin:</strong> admin@blogsphere.com / admin123
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Creator:</strong> alex@example.com / password123
            </p>
            <p style={{ margin: 0, fontSize: '13px', fontStyle: 'italic' }}>
              Explore all features with these pre-configured accounts
            </p>
          </div>
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

export default Login;