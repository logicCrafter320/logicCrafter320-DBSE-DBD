import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT Token Automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Smart Offline Cache Interceptor for Properties
export const fetchPropertiesWithCache = async (params) => {
  try {
    const response = await api.get('/properties', { params });
    // Save to local cache for offline usage
    localStorage.setItem('cached_properties', JSON.stringify(response.data));
    return { data: response.data, isOffline: false };
  } catch (error) {
    console.warn('Network error: Falling back to offline local storage cache.');
    const cachedData = localStorage.getItem('cached_properties');
    if (cachedData) {
      return { data: JSON.parse(cachedData), isOffline: true };
    }
    throw error;
  }
};

export default api;