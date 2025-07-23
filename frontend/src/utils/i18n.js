import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

const i18n = new I18n({
  en,
  ar,
});

// Set the locale once at the beginning of your app
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

// Configure RTL support
const configureRTL = (locale) => {
  const isRTL = locale === 'ar';
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

// Language storage keys
const LANGUAGE_KEY = '@app_language';

// Get stored language
export const getStoredLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return storedLanguage || 'en';
  } catch (error) {
    console.error('Error getting stored language:', error);
    return 'en';
  }
};

// Store language
export const storeLanguage = async (language) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error storing language:', error);
  }
};

// Change language
export const changeLanguage = async (language) => {
  i18n.locale = language;
  configureRTL(language);
  await storeLanguage(language);
};

// Initialize language
export const initializeLanguage = async () => {
  const storedLanguage = await getStoredLanguage();
  i18n.locale = storedLanguage;
  configureRTL(storedLanguage);
  return storedLanguage;
};

// Translation function
export const t = (key, options = {}) => {
  return i18n.t(key, options);
};

// Get current locale
export const getCurrentLocale = () => i18n.locale;

// Check if current language is RTL
export const isRTL = () => getCurrentLocale() === 'ar';

export default i18n;
