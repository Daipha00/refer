import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertPill, DriverSheet, EmergencyFrame, MapCanvas, StatusBanner } from './shared';

export default function EmergencyPickupArrivedScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas
        showRoute
        showAmbulance
        ambulanceStyle={{ left: '66%', top: '58%', transform: [{ rotate: '82deg' }] }}
        topBubble={<AlertPill text="Your Ambulance is Here!" icon="bell" />}
      >
        <View style={styles.arrivedTag}>
          <Text style={styles.arrivedText}>Arrived!</Text>
        </View>
      </MapCanvas>
      <StatusBanner text="Help is here!" time="00:00" color="#188038" />
      <DriverSheet
        onChange={() => router.push('/Emergency/choose')}
        onCall={() => router.push('/Emergency/to-facility')}
        onCancel={() => router.back()}
      />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  arrivedTag: {
    position: 'absolute',
    right: 40,
    top: '58%',
    backgroundColor: '#0D2F6F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  arrivedText: { color: '#FFFFFF', fontSize: 12 },
});
