import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertPill, EmergencyFrame, JourneySheet, MapCanvas, StatusBanner } from './shared';

export default function EmergencyAtFacilityScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={styles.frame}>
      <MapCanvas
        showRoute
        routeVariant="to-hospital"
        showAmbulance
        ambulanceStyle={{ right: 14, top: '10%', transform: [{ rotate: '94deg' }] }}
        topBubble={<AlertPill text="We are here!" icon="bell" />}
      >
        <View style={styles.arrivedTag}>
          <Text style={styles.arrivedText}>Arrived</Text>
        </View>
      </MapCanvas>
      <StatusBanner text="You are at the health facility." time="00:00" color="#188038" />
      <JourneySheet onPrimary={() => router.push('/Emergency/review')} onSecondary={() => router.push('/Emergency/review')} />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  frame: { backgroundColor: '#ECEBE9' },
  arrivedTag: {
    position: 'absolute',
    right: 24,
    top: '10%',
    backgroundColor: '#0D2F6F',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  arrivedText: { color: '#FFFFFF', fontSize: 12 },
});
