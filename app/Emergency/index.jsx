import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { EmergencyFrame, EmergencyTypeChips, LocationFooter, PanicButton, TopBackRow } from './shared';

export default function EmergencyScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame>
      <TopBackRow onBack={() => router.back()} />
      <View style={styles.content}>
        <Text style={styles.title}>Having an Emergency?</Text>
        <Text style={styles.subtitle}>
          Select Your Emergency and Press the Button{'\n'}Below to Find Ambulances Near You!
        </Text>
        <EmergencyTypeChips />
        <PanicButton onPress={() => router.push('/Emergency/location')} />
      </View>
      <LocationFooter />
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  title: { color: '#1550B8', fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  subtitle: { color: '#667085', fontSize: 16, lineHeight: 28, textAlign: 'center', marginBottom: 24 },
});
