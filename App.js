import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from '@navigators';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
