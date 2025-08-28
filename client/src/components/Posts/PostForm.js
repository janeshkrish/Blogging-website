import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const PostForm = ({ initialPost = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: '',
    image: '',
    status: 'published'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialPost && isEdit) {
      setFormData({
        title: initialPost.title || '',
        body: initialPost.body || '',
        tags: initialPost.tags ? initialPost.tags.join(', ') : '',
        image: initialPost.image || '',
        status: initialPost.status || 'published'
      });
    }
  }, [initialPost, isEdit]);

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

    try {
      const postData = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag && tag.length > 0),
        image: formData.image.trim(),
        status: formData.status
      };

      let response;
      if (isEdit) {
        response = await axios.put(`/posts/${initialPost._id}`, postData);
      } else {
        response = await axios.post('/posts', postData);
      }

      const post = response.data.post;
      navigate(`/post/${post.slug}`);
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} post`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError('');

    try {
      const postData = {
        title: formData.title.trim() || 'Untitled Draft',
        body: formData.body.trim() || '',
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag && tag.length > 0),
        image: formData.image.trim(),
        status: 'draft'
      };

      let response;
      if (isEdit) {
        response = await axios.put(`/posts/${initialPost._id}`, postData);
      } else {
        response = await axios.post('/posts', postData);
      }

      alert('Draft saved successfully!');
      if (!isEdit) {
        navigate('/profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="form-container">
        <h1 className="form-title">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter a compelling title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Featured Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div style={{ marginTop: '12px' }}>
                <img 
                  src={formData.image} 
                  alt="Preview"
                  style={{ 
                    maxWidth: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid #e9ecef'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">Content *</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="form-input form-textarea"
              style={{ minHeight: '300px' }}
              placeholder="Share your story... (Supports Markdown formatting)"
              required
            />
            <small style={{ color: '#6c757d', fontSize: '13px', display: 'block', marginTop: '4px' }}>
              You can use Markdown formatting like **bold**, *italic*, and ## headings
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="javascript, react, web development (separated by commas)"
            />
            <small style={{ color: '#6c757d', fontSize: '13px', display: 'block', marginTop: '4px' }}>
              Separate tags with commas. Great tags help people find your content.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-input"
              style={{ cursor: 'pointer' }}
            >
              <option value="published">Published - Visible to everyone</option>
              <option value="draft">Draft - Only visible to you</option>
            </select>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ minWidth: '120px' }}
              >
                {loading ? 'Publishing...' : (isEdit ? 'Update Post' : 'Publish Post')}
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="btn btn-secondary"
                disabled={loading}
                style={{ minWidth: '120px' }}
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#495057' }}>
            💡 Writing Tips
          </h3>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px', 
            color: '#6c757d',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <li>Use a clear, descriptive title that captures attention</li>
            <li>Start with a compelling introduction to hook your readers</li>
            <li>Break up long paragraphs for better readability</li>
            <li>Add relevant tags to help people discover your content</li>
            <li>Save drafts frequently to avoid losing your work</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostForm;