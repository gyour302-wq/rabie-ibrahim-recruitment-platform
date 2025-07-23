import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  RefreshControl,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { jobsAPI } from '../utils/apiService';
import { COLORS, SIZES } from '../utils/constants';
import { globalStyles } from '../styles/globalStyles';
import * as DocumentPicker from 'expo-document-picker';

const JobsScreen = ({ navigation }) => {
  const { t, isRTL } = useLanguage();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cv: null,
    video: null
  });

  // Sample modern job data
  const sampleJobs = [
    {
      _id: '1',
      title: 'مهندس برمجيات',
      titleEn: 'Software Engineer',
      location: 'الرياض، السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
      description: 'نبحث عن مهندس برمجيات ذو خبرة لتطوير تطبيقات الويب والهاتف المحمول',
      descriptionEn: 'We are looking for an experienced software engineer to develop web and mobile applications',
      requirements: 'خبرة 3-5 سنوات، React Native، Node.js، MongoDB',
      requirementsEn: '3-5 years experience, React Native, Node.js, MongoDB',
      salary: '8000-12000 ريال',
      salaryEn: '8000-12000 SAR',
      postedDate: '2024-01-15'
    },
    {
      _id: '2',
      title: 'مدير مشروع',
      titleEn: 'Project Manager',
      location: 'جدة، السعودية',
      locationEn: 'Jeddah, Saudi Arabia',
      description: 'مدير مشروع للإشراف على مشاريع تطوير البرمجيات',
      descriptionEn: 'Project manager to oversee software development projects',
      requirements: 'خبرة 5+ سنوات، PMP، إدارة فرق، Agile',
      requirementsEn: '5+ years experience, PMP, team management, Agile',
      salary: '10000-15000 ريال',
      salaryEn: '10000-15000 SAR',
      postedDate: '2024-01-14'
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // For demo, using sample data
      setJobs(sampleJobs);
      
      // Uncomment when API is ready
      // const response = await jobsAPI.getAll();
      // if (response.success) {
      //   setJobs(response.data);
      // }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(sampleJobs); // Fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentPick = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === 'cv' 
          ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
          : ['video/mp4', 'video/quicktime'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setFormData(prev => ({ ...prev, [type]: result }));
      }
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to pick document');
    }
  };

  const handleSubmitApplication = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert(t('common.error'), t('jobApplication.error'));
      return;
    }

    try {
      // Here you would normally send the application to your API
      Alert.alert(
        t('common.success'),
        t('jobApplication.success'),
        [{ text: t('common.ok'), onPress: () => setModalVisible(false) }]
      );
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', cv: null, video: null });
    } catch (error) {
      Alert.alert(t('common.error'), error.message);
    }
  };

  const renderJobItem = ({ item }) => (
    <View style={[styles.jobCard, isRTL && styles.jobCardRTL]}>
      <View style={styles.cardHeader}>
        <View style={styles.jobInfo}>
          <Text style={[styles.jobTitle, isRTL && styles.rtlText]}>
            {isRTL ? item.title : item.titleEn}
          </Text>
          <Text style={[styles.jobLocation, isRTL && styles.rtlText]}>
            📍 {isRTL ? item.location : item.locationEn}
          </Text>
        </View>
        <View style={styles.salaryBadge}>
          <Text style={styles.salaryText}>{isRTL ? item.salary : item.salaryEn}</Text>
        </View>
      </View>
      
      <Text style={[styles.jobDescription, isRTL && styles.rtlText]} numberOfLines={3}>
        {isRTL ? item.description : item.descriptionEn}
      </Text>
      
      <View style={styles.requirementsSection}>
        <Text style={[styles.requirementsTitle, isRTL && styles.rtlText]}>
          {t('jobs.requirements')}:
        </Text>
        <Text style={[styles.requirementsText, isRTL && styles.rtlText]} numberOfLines={2}>
          {isRTL ? item.requirements : item.requirementsEn}
        </Text>
      </View>
      
      <View style={[styles.cardFooter, isRTL && styles.cardFooterRTL]}>
        <Text style={styles.postedDate}>
          {t('common.posted')}: {item.postedDate}
        </Text>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => handleApplyNow(item)}
        >
          <Text style={styles.applyButtonText}>
            {t('jobs.applyNow')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
        {t('jobs.title')}
      </Text>
      <Text style={[styles.subtitle, isRTL && styles.rtlText]}>
        {t('jobs.subtitle')}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.centerContainer}>
          <Text style={[globalStyles.body, isRTL && styles.rtlText]}>
            {t('common.loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={globalStyles.centerContainer}>
            <Text style={[globalStyles.body, isRTL && styles.rtlText]}>
              {t('jobs.noJobs')}
            </Text>
          </View>
        }
      />

      {/* Apply Now Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>
                  {t('jobApplication.title')}
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {selectedJob && (
                <View style={styles.jobPreview}>
                  <Text style={[styles.jobPreviewTitle, isRTL && styles.rtlText]}>
                    {isRTL ? selectedJob.title : selectedJob.titleEn}
                  </Text>
                  <Text style={[styles.jobPreviewLocation, isRTL && styles.rtlText]}>
                    {isRTL ? selectedJob.location : selectedJob.locationEn}
                  </Text>
                </View>
              )}

              <View style={styles.formSection}>
                <TextInput
                  style={[styles.input, isRTL && styles.rtlText]}
                  placeholder={t('jobApplication.fullName')}
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  textAlign={isRTL ? 'right' : 'left'}
                />

                <TextInput
                  style={[styles.input, isRTL && styles.rtlText]}
                  placeholder={t('jobApplication.email')}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  textAlign={isRTL ? 'right' : 'left'}
                />

                <TextInput
                  style={[styles.input, isRTL && styles.rtlText]}
                  placeholder={t('jobApplication.phoneNumber')}
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                  textAlign={isRTL ? 'right' : 'left'}
                />

                <TouchableOpacity 
                  style={[styles.fileUploadButton, formData.cv && styles.fileUploaded]}
                  onPress={() => handleDocumentPick('cv')}
                >
                  <Text style={[styles.fileUploadText, isRTL && styles.rtlText]}>
                    {formData.cv ? formData.cv.name : t('jobApplication.uploadCV')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.fileUploadButton, formData.video && styles.fileUploaded]}
                  onPress={() => handleDocumentPick('video')}
                >
                  <Text style={[styles.fileUploadText, isRTL && styles.rtlText]}>
                    {formData.video ? formData.video.name : t('jobApplication.uploadVideo')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleSubmitApplication}
                >
                  <Text style={styles.submitButtonText}>
                    {t('jobApplication.submit')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  
  header: {
    marginBottom: SIZES.margin * 2,
    paddingBottom: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
  },
  
  jobCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  
  jobCardRTL: {
    alignItems: 'flex-end',
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.margin,
  },
  
  jobInfo: {
    flex: 1,
  },
  
  jobTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  jobLocation: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
  },
  
  salaryBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  
  salaryText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  
  jobDescription: {
    fontSize: SIZES.body1,
    color: COLORS.black,
    lineHeight: 22,
    marginBottom: SIZES.margin,
  },
  
  requirementsSection: {
    marginBottom: SIZES.margin,
  },
  
  requirementsTitle: {
    fontSize: SIZES.body1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  requirementsText: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
    lineHeight: 20,
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  
  cardFooterRTL: {
    flexDirection: 'row-reverse',
  },
  
  postedDate: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
  },
  
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  
  applyButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: SIZES.padding * 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  
  modalContentRTL: {
    alignItems: 'flex-end',
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: SIZES.padding,
  },
  
  modalTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  
  closeButton: {
    padding: 4,
  },
  
  closeButtonText: {
    fontSize: 24,
    color: COLORS.gray,
  },
  
  jobPreview: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
  },
  
  jobPreviewTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  
  jobPreviewLocation: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
  },
  
  formSection: {
    marginBottom: SIZES.margin,
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
  
  fileUploadButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  
  fileUploaded: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray,
  },
  
  fileUploadText: {
    fontSize: SIZES.body1,
    color: COLORS.gray,
  },
  
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
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

export default JobsScreen;
