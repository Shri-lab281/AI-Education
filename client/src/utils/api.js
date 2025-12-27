import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Learning Path API
export const learningPathAPI = {
  create: (data) => api.post('/learning-paths', data),
  getAll: () => api.get('/learning-paths'),
  updateProgress: (pathId, progressPercentage) => 
    api.put(`/learning-paths/${pathId}/progress`, { progressPercentage }),
  delete: (pathId) => api.delete(`/learning-paths/${pathId}`),
};

// Doubt API
export const doubtAPI = {
  submit: (data) => api.post('/doubts', data),
  getHistory: () => api.get('/doubts'),
  rate: (doubtId, rating) => api.put(`/doubts/${doubtId}/rate`, { rating }),
};

// Assignment API
export const assignmentAPI = {
  submit: (data) => api.post('/assignments', data),
  getAll: () => api.get('/assignments'),
  getById: (assignmentId) => api.get(`/assignments/${assignmentId}`),
  getAllForAdmin: () => api.get('/assignments/all'),
};

// Performance API
export const performanceAPI = {
  add: (data) => api.post('/performance', data),
  getHistory: () => api.get('/performance'),
  getAnalytics: () => api.get('/performance/analytics'),
};

// Resources API
export const resourcesAPI = {
  getAll: (params) => api.get('/resources', { params }),
  add: (data) => api.post('/resources', data),
};

// Analytics API
export const analyticsAPI = {
  getAll: () => api.get('/analytics'),
};

export default api;
