// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNav from './components/BottomNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <SafeAreaProvider>
    <NavigationContainer>
        <BottomNav />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
