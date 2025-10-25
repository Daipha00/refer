import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import PatientRefferal from './PatientRefferal';
import PatientDetail from './PatientDetail';
import Review from './Review';

const Multistep = () => {
  const [step, setStep] = useState(1); // step = 1: Referring, 2: Patient, 3: Review

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep(1)}><Text style={styles.stepButton}>Referring</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(2)}><Text style={styles.stepButton}>Patient</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(3)}><Text style={styles.stepButton}>Review</Text></TouchableOpacity>
      </View> */}

       <View style={{ flexDirection: "row", justifyContent: "space-around", backgroundColor: "#f0f0f0", padding: 10 }}>
            <Text>1. Referral</Text>
            <Text>2. Patient Detail</Text>
            <Text>3. Review</Text>
          </View>

      <ScrollView style={styles.content}>
        {step === 1 && <PatientRefferal />}
        {step === 2 && <PatientDetail />}
        {step === 3 && <Review />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Multistep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  stepButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 10,
  },
});
