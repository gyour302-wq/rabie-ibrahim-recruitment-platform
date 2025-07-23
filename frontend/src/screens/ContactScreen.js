import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  TextInput,
  Alert,
  Linking
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS, SIZES } from '../utils/constants';
import { globalStyles } from '../styles/globalStyles';

const ContactScreen = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert(
        t('common.error'),
        'Please fill in all fields',
        [{ text: t('common.ok') }]
      );
      return;
    }

    Alert.alert(
      t('common.success'),
      'Message sent successfully!',
      [{ text: t('common.ok') }]
    );

    setFormData({ name: '', email: '', message: '' });
  };

  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWhatsAppPress = (phone) => {
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
            {t('contact.title')}
          </Text>
        </View>

        <View style={styles.contactInfoSection}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('contact.title')}
          </Text>
          
          <Text style={[styles.contactText, isRTL && styles.rtlText]}>
            📍 {t('contact.address')}
          </Text>
          
          <TouchableOpacity onPress={() => handlePhonePress('01000268821')}>
            <Text style={[styles.contactText, styles.clickableText, isRTL && styles.rtlText]}>
              📞 {t('contact.phones')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleEmailPress('taha.hr497@gmail.com')}>
            <Text style={[styles.contactText, styles.clickableText, isRTL && styles.rtlText]}>
              📧 {t('contact.emails')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleWhatsAppPress('201000268821')}>
            <Text style={[styles.contactText, styles.clickableText, isRTL && styles.rtlText]}>
              💬 {t('contact.whatsapp')}: 01000268821
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
            {t('contact.title')}
          </Text>
          
          <TextInput
            style={[styles.input, isRTL && styles.rtlText]}
            placeholder={t('contact.name')}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            textAlign={isRTL ? 'right' : 'left'}
          />
          
          <TextInput
            style={[styles.input, isRTL && styles.rtlText]}
            placeholder={t('contact.email')}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            textAlign={isRTL ? 'right' : 'left'}
          />
          
          <TextInput
            style={[styles.textArea, isRTL && styles.rtlText]}
            placeholder={t('contact.message')}
            value={formData.message}
            onChangeText={(text) => handleInputChange('message', text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            textAlign={isRTL ? 'right' : 'left'}
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {t('contact.submit')}
            </Text>
          </TouchableOpacity>
        </View>
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
  
  contactInfoSection: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
  },
  
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  
  contactText: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 22,
  },
  
  clickableText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  
  formSection: {
    marginBottom: SIZES.margin * 2,
  },
  
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.body1,
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.white,
  },
  
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.body1,
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.white,
    minHeight: 100,
  },
  
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  
  submitButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontWeight: 'bold',
  },
  
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default ContactScreen;
