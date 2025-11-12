import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const dangerZoneAPI = {
  report: (data) => api.post('/danger-zones/report', data),
  getByRadius: (lat, lng, radius) => api.get(`/danger-zones/radius?lat=${lat}&lng=${lng}&radius=${radius}`),
};

export const routeAPI = {
  getSafeRoute: (data) => api.post('/routes/safe-route', data),
};

export default api;