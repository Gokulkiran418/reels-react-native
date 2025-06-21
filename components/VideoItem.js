// components/VideoItem.js

/**
 * VideoItem
 * Renders a full-screen video with overlays:
 * - Left: hashtag, creator info, title, description, paid badge, mute toggle
 * - Right: action icons (like, comment, share, earnings, more)
 * Handles play/pause on tap, auto-play when in view, and navigation to profile.
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const isSmallScreen = width < 350;

const dynamicStyles = {
  hashtag: {
    fontSize: isSmallScreen ? 14 : 16,
  },
  profilePic: {
    width: isSmallScreen ? 28 : 32,
    height: isSmallScreen ? 28 : 32,
  },
  leftOverlay: {
    bottom: isSmallScreen ? 80 : 100,
  },
  rightOverlay: {
    top: isSmallScreen ? 300 : 320,
  },
};

function VideoItem({ item, isActive }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);

  // Animated value for Follow button
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Derived values memoized
  const hashtag = useMemo(() => `#${item.title.split(' ')[0]}`, [
    item.title,
  ]);
  const formattedLikes = useMemo(
    () => item.likes.toLocaleString(),
    [item.likes]
  );
  const formattedComments = useMemo(
    () => item.comments.toLocaleString(),
    [item.comments]
  );
  const formattedShares = useMemo(
    () => item.shares.toLocaleString(),
    [item.shares]
  );
  const formattedEarnings = useMemo(
    () => `₹ ${item.earnings.toLocaleString()}`,
    [item.earnings]
  );

  // Local UI state
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(!isActive);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Auto play/pause when visibility changes
  useEffect(() => {
    setIsPaused(!isActive);
    if (videoRef.current) {
      isActive
        ? videoRef.current.playAsync()
        : videoRef.current.pauseAsync();
    }
  }, [isActive]);

  // Handlers wrapped with useCallback
  const handleTogglePlay = useCallback(() => {
    if (videoRef.current) {
      isPaused
        ? videoRef.current.playAsync()
        : videoRef.current.pauseAsync();
      setIsPaused((prev) => !prev);
    }
  }, [isPaused]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleToggleFollow = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFollowing((prev) => !prev);
  }, [scaleValue]);

  const handleToggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  const goToProfile = useCallback(() => {
    navigation.navigate('Profile', {
      userName: item.userName,
      userImage: item.userImage,
    });
  }, [navigation, item.userName, item.userImage]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTogglePlay} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <View style={StyleSheet.absoluteFill}>
          <Video
            ref={videoRef}
            source={item.videoUrl}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            isLooping
            shouldPlay={isActive && !isPaused}
            isMuted={isMuted}
          />
          {isPaused && (
            <View style={styles.playButtonContainer}>
              <Ionicons name="play" size={60} color="#fff" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Left Overlay */}
      <View style={[styles.leftOverlay, dynamicStyles.leftOverlay]}>
        <Text style={[styles.hashtag, dynamicStyles.hashtag]}>
          {hashtag}
        </Text>

        <TouchableOpacity
          style={styles.profileRow}
          onPress={goToProfile}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.6}
        >
          <Image
            source={item.userImage}
            style={[styles.profilePic, dynamicStyles.profilePic]}
          />
          <Text style={styles.creatorName}>{item.userName}</Text>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              onPress={handleToggleFollow}
              style={styles.followButton}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              activeOpacity={0.6}
            >
              <Text style={styles.followText}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>

        <Text style={styles.title}>{item.title}</Text>

        <TouchableOpacity
          onPress={handleToggleDescription}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.6}
        >
          <Text
            numberOfLines={showFullDescription ? undefined : 3}
            style={styles.description}
          >
            {item.description}
          </Text>
        </TouchableOpacity>

        {item.isPaid && (
          <TouchableOpacity
            style={styles.paidButton}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            activeOpacity={0.6}
          >
            <Text style={styles.paidText}>Paid</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleToggleMute}
          style={styles.muteButton}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.6}
        >
          <Ionicons
            name={isMuted ? 'volume-mute' : 'volume-high'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Right Overlay */}
      <View style={[styles.rightOverlay, dynamicStyles.rightOverlay]}>
        <Ionicons name="heart" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>{formattedLikes}</Text>
        <Ionicons
          name="chatbubble"
          size={35}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.iconText}>{formattedComments}</Text>
        <Ionicons
          name="share-social"
          size={35}
          color="#fff"
          style={styles.icon}
        />
        <Text style={styles.iconText}>{formattedShares}</Text>
        <Ionicons name="cash" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>{formattedEarnings}</Text>
        <Ionicons
          name="ellipsis-vertical"
          size={35}
          color="#fff"
          style={styles.icon}
        />
      </View>
    </View>
  );
}

// PropTypes for runtime type-checking of props
VideoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    videoUrl: PropTypes.oneOfType([
      PropTypes.number, // require()
      PropTypes.object, // { uri }
    ]).isRequired,
    title: PropTypes.string.isRequired,
    episode: PropTypes.string,
    description: PropTypes.string,
    userName: PropTypes.string.isRequired,
    userImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    likes: PropTypes.number,
    comments: PropTypes.number,
    shares: PropTypes.number,
    earnings: PropTypes.number,
    isPaid: PropTypes.bool,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

// Wrap in React.memo for performance
export default React.memo(VideoItem, (prevProps, nextProps) => {
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.item.id === nextProps.item.id
  );
});

const styles = StyleSheet.create({
  container: {
    height,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  leftOverlay: {
    position: 'absolute',
    left: 12,
    width: '75%',
    zIndex: 10,
  },
  rightOverlay: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  icon: {
    marginBottom: 6,
  },
  iconText: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 12,
  },
  hashtag: {
    fontSize: 16,
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  creatorName: {
    fontSize: 14,
    color: '#fff',
    marginRight: 6,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  followText: {
    fontSize: 13,
    color: '#fff',
  },
  title: {
    fontSize: 13,
    color: '#fff',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  paidButton: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ffcc00',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  paidText: {
    fontSize: 13,
    color: '#ffcc00',
  },
  muteButton: {
    marginTop: 10,
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-start',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
