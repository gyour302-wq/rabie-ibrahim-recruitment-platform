import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { candidatesAPI } from '../utils/apiService';
import { COLORS, SIZES } from '../utils/constants';
import { globalStyles } from '../styles/globalStyles';

const CandidatesScreen = ({ navigation }) => {
  const { t, isRTL } = useLanguage();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sample data for demonstration
  const sampleCandidates = [
    {
      _id: '1',
      name: 'أحمد محمد',
      age: 28,
      jobTitle: 'مهندس برمجيات',
      experience: '5 سنوات خبرة في تطوير الويب',
      skills: 'React, Node.js, MongoDB',
      cvPath: null,
      email: 'ahmed@example.com',
      phone: '01012345678'
    },
    {
      _id: '2',
      name: 'سارة أحمد',
      age: 32,
      jobTitle: 'مديرة مشروع',
      experience: '8 سنوات خبرة في إدارة المشاريع التقنية',
      skills: 'Project Management, Agile, Scrum',
      cvPath: null,
      email: 'sarah@example.com',
      phone: '01087654321'
    }
  ];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      // For now, using sample data
      setCandidates(sampleCandidates);
      
      // Uncomment when API is ready
      // const response = await candidatesAPI.getAll();
      // if (response.success) {
      //   setCandidates(response.data);
      // }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setCandidates(sampleCandidates); // Fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCandidates();
    setRefreshing(false);
  };

  const handleViewCV = (candidate) => {
    Alert.alert(
      t('candidates.viewCV'),
      `${t('candidates.viewCV')} ${candidate.name}`,
      [{ text: t('common.ok') }]
    );
  };

  const handleContactCandidate = (candidate) => {
    Alert.alert(
      t('candidates.contactCandidate'),
      `${t('candidates.contactCandidate')} ${candidate.name}`,
      [{ text: t('common.ok') }]
    );
  };

  const renderCandidateItem = ({ item }) => (
    <View style={[styles.candidateCard, isRTL && styles.candidateCardRTL]}>
      <View style={styles.candidateHeader}>
        <Text style={[styles.candidateName, isRTL && styles.rtlText]}>
          {item.name}
        </Text>
        <Text style={[styles.candidateAge, isRTL && styles.rtlText]}>
          {t('candidates.age')}: {item.age}
        </Text>
      </View>
      
      <Text style={[styles.candidateJobTitle, isRTL && styles.rtlText]}>
        {item.jobTitle}
      </Text>
      
      <Text style={[styles.candidateExperience, isRTL && styles.rtlText]}>
        {t('candidates.experience')}: {item.experience}
      </Text>
      
      <Text style={[styles.candidateSkills, isRTL && styles.rtlText]}>
        {t('candidates.skills')}: {item.skills}
      </Text>
      
      <View style={[styles.buttonContainer, isRTL && styles.buttonContainerRTL]}>
        <TouchableOpacity 
          style={[styles.button, styles.viewButton]}
          onPress={() => handleViewCV(item)}
        >
          <Text style={styles.buttonText}>
            {t('candidates.viewCV')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.contactButton]}
          onPress={() => handleContactCandidate(item)}
        >
          <Text style={styles.buttonText}>
            {t('candidates.contactCandidate')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
        {t('candidates.title')}
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
        data={candidates}
        renderItem={renderCandidateItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={globalStyles.centerContainer}>
            <Text style={[globalStyles.body, isRTL && styles.rtlText]}>
              {t('candidates.noCandidates')}
            </Text>
          </View>
        }
      />
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
  
  candidateCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  candidateCardRTL: {
    alignItems: 'flex-end',
  },
  
  candidateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  
  candidateName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  
  candidateAge: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
  },
  
  candidateJobTitle: {
    fontSize: SIZES.body1,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  
  candidateExperience: {
    fontSize: SIZES.body2,
    color: COLORS.black,
    marginBottom: 4,
  },
  
  candidateSkills: {
    fontSize: SIZES.body2,
    color: COLORS.gray,
    marginBottom: SIZES.margin,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  buttonContainerRTL: {
    flexDirection: 'row-reverse',
  },
  
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  
  viewButton: {
    backgroundColor: COLORS.primary,
  },
  
  contactButton: {
    backgroundColor: COLORS.secondary,
  },
  
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default CandidatesScreen;
