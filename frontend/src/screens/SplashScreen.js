import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../utils/constants';
import { useLanguage } from '../contexts/LanguageContext';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onSkip }) => {
  const { t, currentLanguage, switchLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    switchLanguage(newLanguage);
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, '#2563eb', COLORS.secondary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Language Switcher */}
      <TouchableOpacity style={[styles.languageButton, isRTL ? styles.languageButtonRTL : styles.languageButtonLTR]} onPress={toggleLanguage}>
        <Text style={styles.languageText}>
          {currentLanguage === 'ar' ? 'English' : 'العربية'}
        </Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity style={[styles.skipButton, isRTL ? styles.skipButtonRTL : styles.skipButtonLTR]} onPress={onSkip}>
        <Text style={styles.skipText}>{t('splash.skip')}</Text>
      </TouchableOpacity>

      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>R</Text>
          <Text style={styles.logoSubText}>Rabie Ibrahim</Text>
        </View>
      </View>

      {/* Company Information */}
      <View style={styles.textContainer}>
        <Text style={[styles.companyName, isRTL && styles.rtlText]}>
          {t('splash.companyName')}
        </Text>
        
        <Text style={[styles.licenseText, isRTL && styles.rtlText]}>
          {t('splash.licenseText')}
        </Text>
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacer} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
  },
  
  languageButton: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  
  languageButtonLTR: {
    left: 20,
  },
  
  languageButtonRTL: {
    right: 20,
  },
  
  languageText: {
    color: COLORS.white,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  
  skipButton: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  
  skipButtonLTR: {
    right: 20,
  },
  
  skipButtonRTL: {
    left: 20,
  },
  
  skipText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  
  logoSubText: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  
  companyName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  
  licenseText: {
    fontSize: SIZES.body1,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  
  bottomSpacer: {
    height: 50,
  },
});

export default SplashScreen;
