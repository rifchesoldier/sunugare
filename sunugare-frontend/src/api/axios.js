import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor : injection automatique du token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sunugare_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor : gestion globale des erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sunugare_token');
      localStorage.removeItem('sunugare_user');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('Acces refuse');
    }

    return Promise.reject(error);
  }
);

export default api;
