// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Custom bottom navigation component
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
