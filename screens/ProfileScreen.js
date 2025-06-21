// screens/ProfileScreen.js

/**
 * ProfileScreen.js
 * Displays a dummy profile page with user image and name from navigation params.
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ProfileScreen = ({ route }) => {
  const { userName, userImage } = route.params || {};

  return (
    <View style={styles.container}>
      <Image source={userImage} style={styles.image} />
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.bio}>This is a dummy profile screen.</Text>
    </View>
  );
};

// Prop validation
ProfileScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userName: PropTypes.string,
      userImage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number, // for require()
      ]),
    }),
  }),
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  bio: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
