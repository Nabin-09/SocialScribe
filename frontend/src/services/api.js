import axios from 'axios';

// Use environment variable or fallback to Render URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://socialscribe-f9as.onrender.com/api';

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for cold starts
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    console.error('Error details:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const generatePost = async (briefData) => {
  const response = await api.post('/generate', briefData);
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const updatePost = async (id, updateData) => {
  const response = await api.put(`/posts/${id}`, updateData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default api;
