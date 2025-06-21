// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoFeed from '../components/VideoFeed';

/**
 * HomeScreen renders the vertical video feed component.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <VideoFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Maintain dark theme background
  },
});
