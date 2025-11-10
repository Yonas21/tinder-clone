import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configure API URL based on platform
// iOS Simulator: localhost
// Android Emulator: 10.0.2.2 (special alias to host)
// Physical Device: Use your computer's IP address (e.g., 192.168.1.x)
const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8000/api'; // Android emulator
    }
    return 'http://localhost:8000/api'; // iOS simulator
  }
  // Production URL
  return 'https://your-production-api.com/api';
};

const API_BASE_URL = getApiUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('auth_token');
      // Navigate to login - you'll need to handle this in your navigation
    }
    return Promise.reject(error);
  }
);

export default api;

