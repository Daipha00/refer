import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AddressCard, AmbulanceListSheet, EmergencyFrame, MapCanvas } from './shared';

export default function EmergencyChooseScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas topCard={<AddressCard subtitle="Looking for nearby ambulances..." />} overlayOpacity={0.1} />
      <AmbulanceListSheet onPrimary={() => router.push('/Emergency/en-route')} onBack={() => router.back()} />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({ frame: { backgroundColor: '#ECEBE9' } });
