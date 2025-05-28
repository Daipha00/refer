import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Review({ navigation }) {
  return (
    <View style={styles.container}>
    <ScrollView  contentContainerStyle={styles.scrollContent}>
      {/* Header Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Stepper */}
      <View style={styles.stepper}>
        <Text style={styles.stepDone}>1. Referring Details</Text>
        <Text style={styles.stepDone}>2. Patient Detail</Text>
        <Text style={styles.stepActive}>3. Review</Text>
      </View>

    
      {/* <View style={styles.alertBox}>
        <Ionicons name="warning-outline" size={20} color="darkred" style={{ marginRight: 5 }} />
        <Text style={styles.alertText}>This case has a high emergency level and requires urgent attention.</Text>
      </View> */}

      {/* Patient Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Patient Detail</Text>

        <DetailRow label="Diagnosis" />
        <DetailRow label="Patient’s Name" />
        <DetailRow label="Age" />
        <DetailRow label="Sex" />

        <Text style={styles.label}>Medical Documents</Text>
        <View style={styles.docRow}>
          {/* Document cards will be added later */}
        </View>

        <DetailRow label="Additional Note" />
        <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Edit section</Text>
      <Ionicons name="pencil" size={20} color="#546E7A" style={styles.icon} />
    </TouchableOpacity>
      </View>
      <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.row}>Referring Detail</Text>
      </View>

      {/* Receiving Information Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Receiving Department</Text>
       
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Receiving Facility</Text>
        
        </View>
      </View>
      <View style={styles.divider} />

{/* Referring Personnel Section */}
<View style={styles.row}>
  <Text style={styles.label}>Referring Personnel</Text>
  <View style={styles.row}>
   
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Medical Profession</Text>
  
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Profession Level</Text>
   
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Phone Number</Text>
  
  </View>
  </View>

{/* Specialty Section */}
<View style={styles.row}>
  <Text style={styles.label}>Specialty</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Referring Department</Text>
  
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Receiving Facility</Text>
  
  </View>
  <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Edit section</Text>
      <Ionicons name="pencil" size={20} color="#546E7A" style={styles.icon} />
    </TouchableOpacity>
    

      </View>
      </ScrollView>
      <View style={styles.container1}>
      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText1}>Send Referral</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
}

const DetailRow = ({ label }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  stepDone: {
    color: 'black',
    paddingBottom: 4,
    fontWeight: '600',
  },
  stepActive: {
    color: 'blue',
    borderBottomWidth: 2,
    borderColor: 'blue',
    paddingBottom: 4,
    fontWeight: '600',
  },
  alertBox: {
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  alertText: {
    color: '#B91C1C',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: '#6B7280',
    marginBottom: 4,
    fontSize: 14,
  },
  docRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add this line
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    },
  buttonText: {
    color: '#546E7A',
    fontSize: 16,
    marginRight: 5,
  },
  icon: {
    marginLeft: 5,
  },
});
