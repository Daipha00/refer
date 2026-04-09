import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AddressCard, DriverSheet, EmergencyFrame, MapCanvas, StatusBanner } from './shared';

export default function EmergencyHelpOnWayScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas
        showRoute
        showAmbulance
        ambulanceStyle={{ left: '69%', top: '43%', transform: [{ rotate: '52deg' }] }}
        topCard={<AddressCard destination="General Hospital Isale" subtitle="General Hospital Isale" />}
      >
        <View style={styles.arriveTag}>
          <Text style={styles.arriveText}>Arrive in 03:28 min</Text>
        </View>
      </MapCanvas>
      <StatusBanner text="Help is on it’s Way! Hold on" time="03:28" />
      <DriverSheet
        onChange={() => router.push('/Emergency/choose')}
        onCall={() => router.push('/Emergency/pickup-arrived')}
        onCancel={() => router.back()}
      />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  arriveTag: {
    position: 'absolute',
    right: 30,
    top: '42%',
    backgroundColor: '#0D2F6F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  arriveText: { color: '#FFFFFF', fontSize: 12 },
});
