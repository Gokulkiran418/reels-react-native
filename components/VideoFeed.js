import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Dimensions,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import VideoItem from './VideoItem';
import mockData from '../data/mockData';

const { height } = Dimensions.get('window');

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const simulateError = Math.random() < 0.2; // 20% chance of failure
      if (simulateError) {
        setHasError(true);
        setLoading(false);
      } else {
        setVideos(mockData);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load videos.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setHasError(false);
            // retry fetch simulation
            setTimeout(() => {
              setVideos(mockData);
              setLoading(false);
            }, 1500);
          }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <VideoItem item={item} isActive={index === currentIndex} />
      )}
      pagingEnabled
      snapToInterval={height}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      windowSize={3}
      onViewableItemsChanged={onViewRef}
      viewabilityConfig={viewConfigRef}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ffcc00',
    borderRadius: 6,
  },
  retryText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
