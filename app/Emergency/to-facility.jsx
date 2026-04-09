import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertPill, EmergencyFrame, JourneySheet, MapCanvas, StatusBanner } from './shared';

export default function EmergencyToFacilityScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas
        showRoute
        routeVariant="to-hospital"
        showAmbulance
        ambulanceStyle={{ right: 18, top: '49%', transform: [{ rotate: '90deg' }] }}
        topBubble={<AlertPill text="Ambulance is headed to a facility" icon="bell" />}
      >
        <View style={styles.arriveTag}>
          <Text style={styles.arriveText}>Arrive in 02:41</Text>
        </View>
      </MapCanvas>
      <StatusBanner text="You will soon get to a facility near you." time="02:41" />
      <JourneySheet onPrimary={() => router.push('/Emergency/at-facility')} onSecondary={() => router.push('/Emergency/review')} />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  arriveTag: {
    position: 'absolute',
    right: 44,
    top: '40%',
    backgroundColor: '#0D2F6F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  arriveText: { color: '#FFFFFF', fontSize: 12 },
});
