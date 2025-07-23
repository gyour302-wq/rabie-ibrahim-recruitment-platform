import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeLanguage, changeLanguage, getCurrentLocale, isRTL, t } from '../utils/i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const language = await initializeLanguage();
        setCurrentLanguage(language);
      } catch (error) {
        console.error('Error initializing language:', error);
        setCurrentLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    initLanguage();
  }, []);

  const switchLanguage = async (language) => {
    try {
      await changeLanguage(language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error switching language:', error);
    }
  };

  const value = {
    currentLanguage,
    switchLanguage,
    isRTL: isRTL(),
    t,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
