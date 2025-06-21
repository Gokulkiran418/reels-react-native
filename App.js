// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import LoginScreen from './screens/LoginScreen';

function RootApp() {
  const { userID, login } = useAppContext();

  if (userID === undefined) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userID ? <BottomNav /> : <LoginScreen onLogin={(id) => login(id)} />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootApp />
      </AppProvider>
    </SafeAreaProvider>
  );
}
