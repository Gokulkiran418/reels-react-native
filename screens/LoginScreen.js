// screens/LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LoginScreen
 * Simple dummy login that stores a userID in AsyncStorage.
 * Calls onLogin() prop when login succeeds.
 */
export default function LoginScreen({ onLogin }) {
  const [userId, setUserId] = useState('');

const handleLogin = async () => {
  if (!userId.trim()) {
    Alert.alert('Please enter a user ID');
    return;
  }
  try {
    await AsyncStorage.setItem('userID', userId.trim());
    onLogin(userId.trim()); // ✅ Fix: Pass ID to parent
  } catch (e) {
    Alert.alert('Login failed, please try again');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ReelsPlayer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter User ID"
        placeholderTextColor="#888"
        value={userId}
        onChangeText={setUserId}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 24,
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
