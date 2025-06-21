// components/VideoFeed.js
import React, { useRef, useState, useCallback } from 'react';
import { FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';
import mockData from '../data/mockData';

const { height } = Dimensions.get('window');

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Callback when viewable items change (i.e., user scrolls to a new video)
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  // Optimize renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(
    ({ item, index }) => <VideoItem item={item} isActive={index === currentIndex} />,
    [currentIndex]
  );

  return (
    <FlatList
      data={mockData}
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
    />
  );
}

// No props passed to VideoFeed, so PropTypes not required here
