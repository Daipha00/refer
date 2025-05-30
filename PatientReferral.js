import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


const PatientReferral = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [department, setDepartment] = useState('Hematology');
  const [facility, setFacility] = useState('Mulago National Referral Hospital');
  const [specialties, setSpecialties] = useState(['Surgeon', 'Pediatrician']);
  const [facilityOpen, setFacilityOpen] = useState(false);
  const [facilityValue, setFacilityValue] = useState(null);
  const [facilityItems, setFacilityItems] = useState([
    { label: 'Mulago National Referral Hospital', value: 'mulago' },
    { label: 'Kiruddu National Referral Hospital', value: 'kiruddu' },
    { label: 'Kawempe National Referral Hospital', value: 'kawempe' },
  ]);

  // Specialty dropdown state
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyValue, setSpecialtyValue] = useState([]);
  const [specialtyItems, setSpecialtyItems] = useState([
    { label: 'Surgeon', value: 'surgeon' },
    { label: 'Pediatrician', value: 'pediatrician' },
    { label: 'Cardiologist', value: 'cardiologist' },
    { label: 'Neurologist', value: 'neurologist' },
  ]);
  const removeSpecialty = (valueToRemove) => {
    setSpecialtyValue(specialtyValue.filter(val => val !== valueToRemove));
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient's Referral</Text>
      </View>

      {/* Multi-step tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, currentStep === 1 && styles.activeTab]}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={[styles.tabText, currentStep === 1 && styles.activeTabText]}>1. Referring Details</Text>
          {currentStep === 1 && <View style={styles.activeUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, currentStep === 2 && styles.activeTab]}
          onPress={() => setCurrentStep(2)}
        >
          <Text style={[styles.tabText, currentStep === 2 && styles.activeTabText]}>2. Patient Detail</Text>
          {currentStep === 2 && <View style={styles.activeUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, currentStep === 3 && styles.activeTab]}
          onPress={() => setCurrentStep(3)}
        >
          <Text style={[styles.tabText, currentStep === 3 && styles.activeTabText]}>3. Review</Text>
          {currentStep === 3 && <View style={styles.activeUnderline} />}
        </TouchableOpacity>
      </View>

      {/* Form content */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receiving Department</Text>
          
          <Text style={styles.label}>Name of Department</Text>
          <TextInput
            style={styles.input}
           placeholder='Enter Department Name'
            onChangeText={setDepartment}
          />

          <Text style={styles.label}>Receiving Facility</Text>
      <DropDownPicker
        open={facilityOpen}
        value={facilityValue}
        items={facilityItems}
        setOpen={setFacilityOpen}
        setValue={setFacilityValue}
        setItems={setFacilityItems}
        placeholder="Select facility"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        zIndex={3000}
        zIndexInverse={1000}
      />

          <Text style={styles.label}>Specialty</Text>
      <DropDownPicker
        open={specialtyOpen}
        value={specialtyValue}
        items={specialtyItems}
        setOpen={setSpecialtyOpen}
        setValue={setSpecialtyValue}
        setItems={setSpecialtyItems}
        multiple={true}
        min={0}
        max={5}
        mode="BADGE"
        placeholder="Select specialties"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        badgeDotColors={['#e6f2ff']}
        zIndex={2000}
        zIndexInverse={2000}
      />
        </View>
      </ScrollView>

      <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate('PatientDetail')}
      >
        <Text style={styles.nextButtonText}>Enter Patient's details</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    padding: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#f8fafc',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  activeUnderline: {
    height: 2,
    backgroundColor: '#007AFF',
    width: '100%',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#374151',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  facilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  facilityText: {
    fontSize: 16,
    color: '#111827',
    marginRight: 8,
  },
  nrhBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nrhBadgeText: {
    color: '#0369a1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specialtyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 14,
    color: '#111827',
    marginRight: 6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PatientReferral;