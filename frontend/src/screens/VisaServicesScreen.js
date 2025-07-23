import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Alert
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS, SIZES } from '../utils/constants';
import { globalStyles } from '../styles/globalStyles';

const VisaServicesScreen = ({ navigation }) => {
  const { t, isRTL } = useLanguage();

  const handleRequestService = () => {
    Alert.alert(
      t('visaServices.requestService'),
      t('common.featureComingSoon'),
      [{ text: t('common.ok') }]
    );
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
            {t('visaServices.title')}
          </Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
            {t('visaServices.description')}
          </Text>
          
          <View style={styles.servicesList}>
            <View style={styles.serviceItem}>
              <Text style={[styles.serviceNumber, isRTL && styles.rtlText]}>1.</Text>
              <Text style={[styles.serviceText, isRTL && styles.rtlText]}>
                {t('visaServices.service1')}
              </Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={[styles.serviceNumber, isRTL && styles.rtlText]}>2.</Text>
              <Text style={[styles.serviceText, isRTL && styles.rtlText]}>
                {t('visaServices.service2')}
              </Text>
            </View>
            
            <View style={styles.serviceItem}>
              <Text style={[styles.serviceNumber, isRTL && styles.rtlText]}>3.</Text>
              <Text style={[styles.serviceText, isRTL && styles.rtlText]}>
                {t('visaServices.service3')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contactSection}>
          <Text style={[styles.contactTitle, isRTL && styles.rtlText]}>
            {t('contact.title')}
          </Text>
          
          <Text style={[styles.contactText, isRTL && styles.rtlText]}>
            📍 {t('contact.address')}
          </Text>
          
          <Text style={[styles.contactText, isRTL && styles.rtlText]}>
            📞 {t('contact.phones')}
          </Text>
          
          <Text style={[styles.contactText, isRTL && styles.rtlText]}>
            📧 {t('contact.emails')}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleRequestService}
        >
          <Text style={styles.requestButtonText}>
            {t('visaServices.requestService')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  
  header: {
    marginBottom: SIZES.margin,
    paddingBottom: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  
  descriptionSection: {
    marginBottom: SIZES.margin * 2,
  },
  
  descriptionText: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    lineHeight: 22,
    marginBottom: SIZES.margin,
  },
  
  servicesList: {
    marginTop: SIZES.margin,
  },
  
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.margin,
  },
  
  serviceNumber: {
    fontSize: SIZES.body1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 8,
    marginLeft: 8,
  },
  
  serviceText: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    flex: 1,
    lineHeight: 22,
  },
  
  contactSection: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
  },
  
  contactTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  
  contactText: {
    fontSize: SIZES.body2,
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 20,
  },
  
  requestButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  
  requestButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontWeight: 'bold',
  },
  
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default VisaServicesScreen;
