import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

import { LanguageProvider, useLanguage } from './src/contexts/LanguageContext';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { globalStyles } from './src/styles/globalStyles';

const Stack = createStackNavigator();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoading } = useLanguage();

  useEffect(() => {
    // Auto-hide splash after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSkipSplash = () => {
    setShowSplash(false);
  };

  if (isLoading) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash">
            {() => <SplashScreen onSkip={handleSkipSplash} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
