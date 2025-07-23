import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Linking
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS, SIZES } from '../utils/constants';
import { globalStyles } from '../styles/globalStyles';

const AboutScreen = () => {
  const { t, isRTL } = useLanguage();

  const handleWebsitePress = () => {
    Linking.openURL('https://rabieibrahimcompany.online');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
            {t('about.title')}
          </Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={[styles.companyName, isRTL && styles.rtlText]}>
            {t('about.companyName')}
          </Text>
          
          <View style={styles.infoSection}>
            <Text style={[styles.infoItem, isRTL && styles.rtlText]}>
              📋 {t('about.license')}
            </Text>
            
            <Text style={[styles.infoItem, isRTL && styles.rtlText]}>
              📍 {t('about.location')}
            </Text>
            
            <Text style={[styles.infoItem, isRTL && styles.rtlText]}>
              ⏰ {t('about.experience')}
            </Text>
            
            <Text style={[styles.infoItem, isRTL && styles.rtlText]}>
              🤝 {t('about.partnerships')}
            </Text>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={[styles.descriptionTitle, isRTL && styles.rtlText]}>
              {t('about.title')}
            </Text>
            
            <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
              شركة ربيع إبراهيم هي شركة رائدة في مجال إلحاق العمالة المصرية بالخارج، 
              تأسست عام 2003 وتمتلك ترخيص رقم 497 من وزارة القوى العاملة المصرية. 
              نحن متخصصون في توظيف الكفاءات المصرية في المملكة العربية السعودية 
              ودول الخليج العربي، مع التركيز على تقديم خدمات شاملة تشمل:
            </Text>
            
            <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
              • توظيف الكفاءات في مختلف التخصصات
            </Text>
            
            <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
              • إنهاء إجراءات التأشيرات والتصاريح
            </Text>
            
            <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
              • توثيق المستندات والشهادات
            </Text>
            
            <Text style={[styles.descriptionText, isRTL && styles.rtlText]}>
              • تقديم استشارات توظيفية
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.websiteButton}
            onPress={handleWebsitePress}
          >
            <Text style={styles.websiteButtonText}>
              {t('about.website')}
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
  
  contentSection: {
    marginBottom: SIZES.margin * 2,
  },
  
  companyName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  
  infoSection: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
  },
  
  infoItem: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    marginBottom: 8,
    lineHeight: 22,
  },
  
  descriptionSection: {
    marginBottom: SIZES.margin * 2,
  },
  
  descriptionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  
  descriptionText: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    lineHeight: 22,
    marginBottom: 8,
  },
  
  websiteButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  
  websiteButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontWeight: 'bold',
  },
  
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default AboutScreen;
