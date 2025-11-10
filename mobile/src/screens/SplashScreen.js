import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms/authAtom';
import { authService } from '../services/authService';

const SplashScreen = () => {
  const navigation = useNavigation();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const userData = await authService.getCurrentUser();
        
        if (userData) {
          // User is authenticated, restore auth state
          setAuth({
            isAuthenticated: true,
            user: userData.user,
            token: userData.token,
          });
          
          // Navigate to main screen after delay
          setTimeout(() => {
            navigation.replace('Main');
          }, 1500);
        } else {
          // No authentication, navigate to login
          setTimeout(() => {
            navigation.replace('Login');
          }, 1500);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // On error, clear auth state and go to login
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        setTimeout(() => {
          navigation.replace('Login');
        }, 1000);
      }
    };

    checkAuth();
  }, [navigation, setAuth]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#FF4458" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4458',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;

