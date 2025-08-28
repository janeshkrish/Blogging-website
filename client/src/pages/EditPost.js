import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostForm from '../components/Posts/PostForm';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${id}`);
      setPost(response.data.post);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!post || !user || post.author._id !== user._id) {
    return <Navigate to="/" replace />;
  }

  return <PostForm initialPost={post} isEdit={true} />;
};

export default EditPost;