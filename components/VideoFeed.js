import React, { useRef, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import VideoItem from './VideoItem';
import mockData from '../data/mockData';

const { height } = Dimensions.get('window');

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update which item is “active” (>=80% visible)
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  return (
    <FlatList
      data={mockData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <VideoItem item={item} isActive={index === currentIndex} />
      )}
      pagingEnabled                     // snap to one item at a time
      snapToInterval={height}           // exactly screen‐height pages
      decelerationRate="fast"           // fast stop on release
      showsVerticalScrollIndicator={false}
      removeClippedSubviews             // unmount offscreen items
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
