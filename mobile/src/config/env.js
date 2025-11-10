import { Platform } from 'react-native';

// Environment Configuration
// Customize these based on your setup
const ENV = {
  dev: {
    apiUrl: Platform.OS === 'android' 
      ? 'http://10.0.2.2:8000/api'  // Android emulator
      : 'http://localhost:8000/api', // iOS simulator or web
    // For physical devices, use your computer's local IP:
    // apiUrl: 'http://192.168.1.XXX:8000/api',
  },
  staging: {
    apiUrl: 'https://staging-api.yourapp.com/api',
  },
  prod: {
    apiUrl: 'https://api.yourapp.com/api',
  },
};

const getEnvVars = (env = '') => {
  if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars(__DEV__ ? 'dev' : 'prod');
