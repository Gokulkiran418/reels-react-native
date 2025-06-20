// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import VideoFeed from '../components/VideoFeed';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <VideoFeed />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default HomeScreen;
