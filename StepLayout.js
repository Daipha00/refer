import React from 'react';
import { View, StyleSheet } from 'react-native';
import Multistep from './Multistep';

const StepLayout = ({ currentStep, children }) => {
  return (
    <View style={styles.container}>
      <Multistep step={currentStep} />
      {children}
    </View>
  );
};

export default StepLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
