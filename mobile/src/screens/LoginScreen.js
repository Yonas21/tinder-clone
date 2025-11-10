import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { authState } from '../atoms/authAtom';
import { authService } from '../services/authService';
import Button from '../components/atoms/Button';

const LoginScreen = () => {
  const navigation = useNavigation();
  const setAuth = useSetRecoilState(authState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: () => authService.login(email, password),
    onSuccess: (data) => {
      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.access_token,
      });
      navigation.replace('Main');
    },
    onError: (error) => {
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    loginMutation.mutate();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Tinder Clone</Text>
        <Text style={styles.subtitle}>Find your match</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={handleLogin}
          style={styles.button}
          disabled={loginMutation.isPending}
        />

        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF4458',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;

