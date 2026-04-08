import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../shared';

export default function SuccessReferralScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Referral Sent Successfully!</Text>
          <Text style={styles.message}>
            The receiving department will be notified. Thank you for ensuring the best care for your patient.
          </Text>

          <PrimaryButton
            label="Done"
            onPress={() => router.replace('/')}
            style={styles.doneButton}
          />

          <PrimaryButton
            label="Book an Ambulance"
            secondary
            onPress={() => router.push('/AmbulanceBooking/AmbulanceBooking')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF3FB',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 34,
    minHeight: '56%',
    justifyContent: 'flex-end',
  },
  handle: {
    alignSelf: 'center',
    width: 62,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D5D9E0',
    marginBottom: 34,
  },
  title: {
    color: '#202531',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 36,
  },
  doneButton: {
    marginBottom: 24,
  },
});
