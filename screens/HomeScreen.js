import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoFeed from '../components/VideoFeed';

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
    backgroundColor: '#000',
  },
});
