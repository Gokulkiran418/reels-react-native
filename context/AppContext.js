// context/AppContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
const AppContext = createContext();

// Custom hook
export const useAppContext = () => useContext(AppContext);

// Provider Component
export const AppProvider = ({ children }) => {
  const [userID, setUserID] = useState(undefined); // undefined = loading, null = not logged in
  const [likes, setLikes] = useState({}); // Optional: track liked videos globally

  // On app start, DO NOT auto-login. Force login manually.
  useEffect(() => {
    setUserID(null); // Always require login on fresh launch
  }, []);

  const login = async (id) => {
    await AsyncStorage.setItem('userID', id);
    setUserID(id);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userID');
    setUserID(null);
  };

  const toggleLike = (videoId) => {
    setLikes((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        userID,
        login,
        logout,
        likes,
        toggleLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
