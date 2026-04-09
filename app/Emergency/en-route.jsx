import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AddressCard, DriverSheet, EmergencyFrame, MapCanvas } from './shared';

export default function EmergencyEnRouteScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas
        showRoute
        showAmbulance
        ambulanceStyle={{ left: '67%', top: '42%', transform: [{ rotate: '50deg' }] }}
        topCard={<AddressCard destination="General Hospital Isale" subtitle="General Hospital Isale" />}
      >
        <View style={styles.arriveTag}>
          <Text style={styles.arriveText}>Arrive in 5mins</Text>
        </View>
      </MapCanvas>
      <DriverSheet
        onChange={() => router.push('/Emergency/choose')}
        onCall={() => router.push('/Emergency/help-on-way')}
        onCancel={() => router.back()}
      />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  arriveTag: {
    position: 'absolute',
    left: 18,
    top: '48%',
    backgroundColor: '#0D2F6F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    transform: [{ rotate: '-20deg' }],
  },
  arriveText: { color: '#FFFFFF', fontSize: 12 },
});
