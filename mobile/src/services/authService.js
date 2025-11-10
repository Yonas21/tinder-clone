import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

export const authService = {
  async login(email, password) {
    const response = await api.post('/login', { email, password });
    if (response.data.access_token) {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.access_token);
      if (response.data.user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  async register(name, email, password) {
    const response = await api.post('/register', { name, email, password });
    if (response.data.access_token) {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.access_token);
      if (response.data.user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await AsyncStorage.multiRemove([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DATA]);
    }
  },

  async getToken() {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async getUser() {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  },

  async getCurrentUser() {
    const [token, user] = await Promise.all([
      this.getToken(),
      this.getUser(),
    ]);
    return token && user ? { token, user } : null;
  },
};

