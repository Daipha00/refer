import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { EmergencyFrame, LocationFooter, PanicButton, TopBackRow } from './shared';

export default function EmergencyLocationScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame>
      <TopBackRow onBack={() => router.back()} />
      <View style={styles.content}>
        <Text style={styles.title}>Having an Emergency?</Text>
        <Text style={styles.subtitle}>
          Select Your Emergency and Press the Button{'\n'}Below to Find Ambulances Near You!
        </Text>
        <PanicButton onPress={() => {}} />
      </View>
      <LocationFooter />
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.locationIcon}>
            <Ionicons name="location-outline" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.modalTitle}>Where are you?</Text>
          <Text style={styles.modalText}>You’ll need to enable your location in order to use this app.</Text>
          <Pressable style={styles.button} onPress={() => router.replace('/Emergency/searching')}>
            <Text style={styles.buttonText}>Open Location Settings</Text>
          </Pressable>
        </View>
      </View>
    </EmergencyFrame>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  title: { color: '#1550B8', fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  subtitle: { color: '#667085', fontSize: 16, lineHeight: 28, textAlign: 'center', marginBottom: 24 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.65)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modal: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 24, paddingVertical: 28, alignItems: 'center' },
  locationIcon: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E4E7EC', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  modalTitle: { color: '#1F2937', fontSize: 20, fontWeight: '700', marginBottom: 18 },
  modalText: { color: '#667085', fontSize: 16, lineHeight: 28, textAlign: 'center', marginBottom: 26 },
  button: { width: '100%', minHeight: 46, borderRadius: 4, backgroundColor: '#DCE8FB', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
});
