// components/VideoFeed.js
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  FlatList,
  Dimensions,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import VideoItem from './VideoItem';
import mockData from '../data/mockData';

const { height } = Dimensions.get('window');
const PAGE_SIZE = 2;

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initial video load
  useEffect(() => {
    const initialVideos = mockData.slice(0, PAGE_SIZE);
    setVideos(initialVideos);
  }, []);

  const loadMoreVideos = () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newVideos = mockData.slice(0, nextPage * PAGE_SIZE);

      if (newVideos.length === videos.length) {
        // No more videos to load
        setIsLoadingMore(false);
        return;
      }

      setVideos(newVideos);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 1000);
  };

  // Track visible video for auto-play
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  const renderItem = useCallback(
    ({ item, index }) => (
      <VideoItem item={item} isActive={index === currentIndex} />
    ),
    [currentIndex]
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
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
      onEndReached={loadMoreVideos}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoadingMore ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ffcc00" />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    paddingVertical: 20,
  },
});
