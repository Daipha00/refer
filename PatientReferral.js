import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView // Added SafeAreaView here as well
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

// Use the component name PatientReferral as you requested
const PatientReferral = () => {
  const navigation = useNavigation();

  // State for Receiving Facility Dropdown
  const [receivingFacilityOpen, setReceivingFacilityOpen] = useState(false);
  const [receivingFacilityValue, setReceivingFacilityValue] = useState('Mulago National Referral Hospital');
  const [receivingFacilityItems, setReceivingFacilityItems] = useState([
    { label: 'Mulago National Referral Hospital', value: 'Mulago National Referral Hospital' },
    { label: 'Kiruddu National Referral Hospital', value: 'Kiruddu National Referral Hospital' },
    { label: 'Kawempe National Referral Hospital', value: 'Kawempe National Referral Hospital' },
  ]);

  // State for Specialty Dropdown
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [specialtyValue, setSpecialtyValue] = useState(['Surgeon', 'Pediatrician']);
  const [specialtyItems, setSpecialtyItems] = useState([
    { label: 'Surgeon', value: 'Surgeon' },
    { label: 'Pediatrician', value: 'Pediatrician' },
    { label: 'Cardiologist', value: 'Cardiologist' },
    { label: 'Neurologist', value: 'Neurologist' },
    { label: 'Oncologist', value: 'Oncologist' },
    { label: 'Hematologist', value: 'Hematologist' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}> {/* Wrap content in SafeAreaView */}
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient's Referral</Text>
        </View>

      
        <View style={styles.progressBar}>
          <TouchableOpacity style={styles.progressStep} onPress={() => navigation.navigate('ReferringDetails')}>
            <Text style={styles.progressStepNumber}>1.</Text>
            <Text style={styles.progressStepTextActive}>Referring Details</Text>
          </TouchableOpacity>
          <View style={styles.progressSeparator} />
          <TouchableOpacity style={styles.progressStep} onPress={() => navigation.navigate('PatientDetail')}>
            <Text style={styles.progressStepNumber}>2.</Text>
            <Text style={styles.progressStepText}>Patient Detail</Text>
          </TouchableOpacity>
          <View style={styles.progressSeparator} />
          <TouchableOpacity style={styles.progressStep} onPress={() => console.log('Navigate to Review')}> {/* Placeholder for Review */}
            <Text style={styles.progressStepNumber}>3.</Text>
            <Text style={styles.progressStepText}>Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receiving Department</Text>
          <Text style={styles.label}>Name of Department</Text>
          <TextInput
            style={styles.input}
            placeholder="Hematology"
           
            editable={true}
          />

          <Text style={styles.label}>Receiving Facility</Text>
          <DropDownPicker
            open={receivingFacilityOpen}
            value={receivingFacilityValue}
            items={receivingFacilityItems}
            setOpen={setReceivingFacilityOpen}
            setValue={setReceivingFacilityValue}
            setItems={setReceivingFacilityItems}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownDropDownContainer}
            zIndex={3000}
            renderBadge={() => (
              <View style={styles.nrhBadge}>
                <Text style={styles.nrhBadgeText}>NRH</Text>
              </View>
            )}
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
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownDropDownContainer}
            zIndex={2000}
            mode="BADGE"
            badgeDotStyle={styles.badgeDot}
            badgeSeparatorStyle={styles.badgeSeparator}
            badgeStyle={styles.badgeStyle}
            badgeTextStyle={styles.badgeTextStyle}
          />
        </View>
      </ScrollView>
        <View style={styles.container1}>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText1}>Enter Patient's details</Text>
            </TouchableOpacity>
          </View>
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    flex: 1, 
    paddingTop: 0, 
    paddingHorizontal: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 150, // prevent last content being hidden behind fixed container
  },
  container1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    zIndex: 10, // ensure it stays on top
  },
  button1: {
    backgroundColor: '#007AFF', 
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#888',
  },
  progressStepText: {
    fontSize: 16,
    color: '#888',
  },
  progressStepTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    borderBottomWidth: 2,
    borderColor: '#007bff',
    paddingBottom: 5,
  },
  progressSeparator: {
    flex: 1,
    height: 2,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#555',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  dropdownContainer: {
    height: 50,
    marginBottom: 20,
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownDropDownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  nrhBadge: {
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 10,
  },
  nrhBadgeText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeStyle: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeTextStyle: {
    color: '#333',
    fontSize: 14,
  },
  badgeDot: {
    display: 'none',
  },
  badgeSeparator: {
    display: 'none',
  },
});

export default PatientReferral; // Exporting PatientReferral as requested