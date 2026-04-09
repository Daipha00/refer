import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AddressCard, EmergencyFrame, MapCanvas, SoftAction } from './shared';

export default function EmergencySearchingScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas showPulse topCard={<AddressCard subtitle="Looking for nearby ambulances..." />} />
      <View style={styles.bottomArea}>
        <SoftAction text="Cancel Ambulance Booking" danger onPress={() => router.back()} />
      </View>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.replace('/Emergency/found')} />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  bottomArea: { paddingHorizontal: 20, paddingBottom: 16, position: 'absolute', bottom: 0, left: 0, right: 0 },
});
