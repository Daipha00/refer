import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AddressCard, AlertPill, EmergencyFrame, MapCanvas, SoftAction } from './shared';

export default function EmergencyFoundScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas showPulse showMarkers topBubble={<AlertPill text="We found Three Ambulances near you!" highlight="Three Ambulances" />} />
      <View style={styles.bottomArea}>
        <AddressCard subtitle="Looking for nearby ambulances..." />
        <SoftAction text="Watch Related First aid videos" icon="play-circle-outline" onPress={() => router.push('/Emergency/found-videos')} />
        <SoftAction text="Cancel Ambulance Booking" danger onPress={() => router.back()} />
      </View>
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  bottomArea: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 16 },
});
