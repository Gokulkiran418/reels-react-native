// components/VideoItem.js
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
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const VideoItem = ({ item, isActive }) => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(!isActive);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setIsPaused(!isActive);

    if (isActive && videoRef.current) {
      setTimeout(() => videoRef.current.seek(0), 500); // replay from beginning with delay
    }
  }, [isActive]);

  const handleTogglePlay = () => setIsPaused((prev) => !prev);
  const handleToggleMute = () => setIsMuted((prev) => !prev);
  const handleToggleFollow = () => setIsFollowing((prev) => !prev);
  const handleToggleDescription = () => setShowFullDescription((prev) => !prev);
  const goToProfile = () => navigation.navigate('Profile', {
    userName: item.userName,
    userImage: item.userImage,
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTogglePlay}>
        <Video
          ref={videoRef}
          source={item.videoUrl}
          style={styles.video}
          resizeMode="cover"
          repeat
          muted={isMuted}
          paused={isPaused}
        />
      </TouchableWithoutFeedback>

      {/* Left Overlay */}
      <View style={styles.leftOverlay}>
        <Text style={styles.hashtag}>#{item.title.split(' ')[0]}</Text>

        <TouchableOpacity style={styles.profileRow} onPress={goToProfile}>
          <Image source={item.userImage} style={styles.profilePic} />
          <Text style={styles.creatorName}>{item.userName}</Text>
          <TouchableOpacity
            onPress={handleToggleFollow}
            style={styles.followButton}
          >
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

        <TouchableOpacity onPress={handleToggleMute} style={styles.fullscreenBtn}>
          <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right Overlay */}
      <View style={styles.rightOverlay}>
        <Text style={styles.iconText}>{item.likes.toLocaleString()} ❤️</Text>
        <Text style={styles.iconText}>{item.comments.toLocaleString()} 💬</Text>
        <Text style={styles.iconText}>{item.shares.toLocaleString()} ↗️</Text>
        <Text style={styles.iconText}>₹ {item.earnings.toLocaleString()} 💸</Text>
        <Text style={styles.more}>⋮</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height, width: '100%', position: 'relative', backgroundColor: '#000' },
  video: { height: '100%', width: '100%' },

  leftOverlay: {
    position: 'absolute',
    left: 12,
    bottom: 80,
    width: '70%',
    zIndex: 10,
  },
  rightOverlay: {
    position: 'absolute',
    right: 12,
    bottom: 100,
    alignItems: 'flex-end',
  },
  hashtag: { fontSize: 14, color: '#ffcc00', fontWeight: 'bold' },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  profilePic: { width: 24, height: 24, borderRadius: 12, marginRight: 6 },
  creatorName: { fontSize: 12, color: '#fff', marginRight: 6 },
  followButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  followText: { fontSize: 10, color: '#fff' },
  title: { fontSize: 12, color: '#fff', marginTop: 4 },
  description: { fontSize: 11, color: '#ccc', marginTop: 2 },
  paidButton: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ffcc00',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  paidText: { fontSize: 11, color: '#ffcc00' },
  fullscreenBtn: {
    marginTop: 6,
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-start',
  },
  iconText: { color: '#fff', fontSize: 12, marginBottom: 4 },
  more: { fontSize: 18, color: '#fff', marginTop: 8 },
});

export default VideoItem;
