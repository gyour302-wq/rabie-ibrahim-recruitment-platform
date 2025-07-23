import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS, SIZES } from '../utils/constants';

// Import screens (to be created)
import JobsScreen from '../screens/JobsScreen';
import CandidatesScreen from '../screens/CandidatesScreen';
import VisaServicesScreen from '../screens/VisaServicesScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

const TabBarLabel = ({ focused, title }) => (
  <Text style={[
    styles.tabLabel,
    { color: focused ? COLORS.primary : COLORS.gray }
  ]}>
    {title}
  </Text>
);

const TabBarIcon = ({ focused, label }) => (
  <View style={[
    styles.tabIcon,
    { backgroundColor: focused ? COLORS.primary : 'transparent' }
  ]}>
    <Text style={[
      styles.tabIconText,
      { color: focused ? COLORS.white : COLORS.gray }
    ]}>
      {label.charAt(0).toUpperCase()}
    </Text>
  </View>
);

const BottomTabNavigator = () => {
  const { t, isRTL } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          isRTL && styles.tabBarRTL
        ],
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: styles.tabLabelStyle,
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title={t('navigation.jobs')} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={t('navigation.jobs')} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Candidates"
        component={CandidatesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title={t('navigation.candidates')} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={t('navigation.candidates')} />
          ),
        }}
      />
      
      <Tab.Screen
        name="VisaServices"
        component={VisaServicesScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title={t('navigation.visaServices')} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={t('navigation.visaServices')} />
          ),
        }}
      />
      
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title={t('navigation.aboutUs')} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={t('navigation.aboutUs')} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title={t('navigation.contact')} />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={t('navigation.contact')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingVertical: 8,
    height: 70,
  },
  
  tabBarRTL: {
    flexDirection: 'row-reverse',
  },
  
  tabLabelStyle: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    marginTop: 4,
  },
  
  tabLabel: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  
  tabIconText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;
