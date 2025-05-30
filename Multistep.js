// Multistep.js
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const steps = [
  { number: 1, title: 'Referring Details' },
  { number: 2, title: 'Patient Detail' },
  { number: 3, title: 'Review' },
];

// `step` is passed from StepLayout
const Multistep = ({ step = 1 }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {steps.map((item) => (
          <View key={item.number} style={styles.stepContainer}>
            <Text style={[styles.stepText, step === item.number && styles.activeStepText]}>
              {item.number}. {item.title}
            </Text>
            <View style={[styles.stepUnderline, step === item.number && styles.activeUnderline]} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Multistep;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: '#F8FAFC',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  stepUnderline: {
    height: 2,
    width: '100%',
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  activeUnderline: {
    backgroundColor: '#007AFF',
  },
  stepText: {
    fontSize: 12,
    color: '#6b7280',
    flexWrap: 'nowrap',
  },
  activeStepText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});
