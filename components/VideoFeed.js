// components/VideoFeed.js
import React, { useRef, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import VideoItem from './VideoItem';
import mockData from '../data/mockData';

const { height } = Dimensions.get('window');

const VideoFeed = () => {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <FlatList
      data={mockData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <VideoItem
          item={item}
          isActive={index === currentVisibleIndex}
        />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
};

export default VideoFeed;
