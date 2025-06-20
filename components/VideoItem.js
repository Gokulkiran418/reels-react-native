import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

export default function VideoItem({ item, isActive }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(!isActive);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setIsPaused(!isActive);
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isActive]);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      isPaused ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
      setIsPaused(!isPaused);
    }
  };
  const handleToggleMute = () => setIsMuted((prev) => !prev);
  const handleToggleFollow = () => setIsFollowing((prev) => !prev);
  const handleToggleDescription = () => setShowFullDescription((prev) => !prev);
  const goToProfile = () =>
    navigation.navigate('Profile', {
      userName: item.userName,
      userImage: item.userImage,
    });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTogglePlay}>
        <Video
          ref={videoRef}
          source={item.videoUrl}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          isLooping
          shouldPlay={isActive && !isPaused}
          isMuted={isMuted}
        />
      </TouchableWithoutFeedback>

      {/* Left Overlay */}
      <View style={styles.leftOverlay}>
        <Text style={styles.hashtag}>#{item.title.split(' ')[0]}</Text>

        <TouchableOpacity style={styles.profileRow} onPress={goToProfile}>
          <Image source={item.userImage} style={styles.profilePic} />
          <Text style={styles.creatorName}>{item.userName}</Text>
          <TouchableOpacity onPress={handleToggleFollow} style={styles.followButton}>
            <Text style={styles.followText}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.title}>{item.title}</Text>

        <TouchableOpacity onPress={handleToggleDescription}>
          <Text
            numberOfLines={showFullDescription ? undefined : 3}
            style={styles.description}
          >
            {item.description}
          </Text>
        </TouchableOpacity>

        {item.isPaid && (
          <TouchableOpacity style={styles.paidButton}>
            <Text style={styles.paidText}>Paid</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleToggleMute} style={styles.muteButton}>
          <Ionicons
            name={isMuted ? 'volume-mute' : 'volume-high'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Right Overlay */}
      <View style={styles.rightOverlay}>
        <Ionicons name="heart" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>{item.likes.toLocaleString()}</Text>
        <Ionicons name="chatbubble" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>{item.comments.toLocaleString()}</Text>
        <Ionicons name="share-social" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>{item.shares.toLocaleString()}</Text>
        <Ionicons name="cash" size={35} color="#fff" style={styles.icon} />
        <Text style={styles.iconText}>₹ {item.earnings.toLocaleString()}</Text>
        <Ionicons name="ellipsis-vertical" size={35} color="#fff" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden', // ✅ Prevent overlapping issues
  },
  leftOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 12,
    width: '75%',
    zIndex: 10,
  },
  rightOverlay: {
    position: 'absolute',
    top: 320,
    right: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  video: {
    width: '100%',
    height: '100%',
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
});
