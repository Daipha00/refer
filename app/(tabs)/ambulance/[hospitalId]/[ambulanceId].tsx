import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findAmbulanceById, hospitalProfiles } from '../../../hospital/data';

export default function AmbulanceDetailScreen() {
  const router = useRouter();
  const { hospitalId, ambulanceId } = useLocalSearchParams<{ hospitalId: string; ambulanceId: string }>();
  const selected = findAmbulanceById(ambulanceId ?? '');
  const hospital = selected?.hospital ?? hospitalProfiles[hospitalId as keyof typeof hospitalProfiles] ?? hospitalProfiles.uci;
  const ambulance = selected?.ambulance ?? hospital.ambulances?.[0];
  const review = hospital.review ?? hospitalProfiles.uci.review;

  if (!ambulance) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={ambulance.image} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTopRow}>
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="chevron-back-outline" size={28} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileWrap}>
          <View style={styles.profileImageWrap}>
            <Image source={ambulance.image} style={styles.profileImage} />
          </View>
          <View style={[styles.badge, ambulance.grade === 'A' ? styles.gradeA : ambulance.grade === 'B' ? styles.gradeB : styles.gradeC]}>
            <Text style={styles.badgeText}>{ambulance.grade}</Text>
          </View>
        </View>

        <Text style={styles.ambulanceCode}>{ambulance.code}</Text>
        <Text style={styles.hospitalName}>{hospital.name}</Text>
        <View style={styles.statusRow}>
          <Text style={[styles.statusText, ambulance.status === 'Available' ? styles.available : styles.unavailable]}>{ambulance.status}</Text>
          <Text style={styles.distanceText}>({hospital.distance})</Text>
        </View>

        <View style={styles.metaRow}>
          <Feather name="users" size={15} color="#98A2B3" />
          <Text style={styles.metaText}>{ambulance.personnel ?? '2 Personnel'}</Text>
        </View>

        <Pressable style={styles.callButton}>
          <Feather name="phone" size={18} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call Ambulance Driver</Text>
        </Pressable>

        <Text style={styles.copyRow}>
          or copy <Text style={styles.copyLink}>+256 772 123 456</Text>
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reviews (4.8)</Text>
          <View style={styles.sectionLinkRow}>
            <Text style={styles.sectionLink}>read all</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </View>
        </View>

        <View style={styles.reviewCard}>
          <Ionicons name="person-circle-outline" size={46} color="#98A2B3" />
          <View style={styles.reviewMain}>
            <Text style={styles.reviewText}>{review.text}</Text>
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewDept}>from {review.department}</Text>
          </View>
          <View style={styles.reviewScore}>
            <AntDesign name="star" size={16} color="#D4A600" />
            <Text style={styles.reviewScoreText}>{review.score}</Text>
          </View>
        </View>

        <View style={styles.reviewModal}>
          <View style={styles.reviewHeader}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="#1F2937" />
            </Pressable>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="close-circle-outline" size={24} color="#98A2B3" />
            </Pressable>
          </View>
          <Text style={styles.reviewTitle}>Share Your Ambulance Review</Text>
          <Text style={styles.reviewSubtitle}>Help us improve by sharing your thoughts on the ambulance service</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Write here....</Text>
          </View>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <View key={star} style={styles.starWrap}>
                <AntDesign name="star" size={36} color="#D0D5DD" />
                <Text style={styles.starLabel}>{star}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.submitButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 28 },
  hero: { height: 210, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.18)' },
  heroTopRow: { position: 'absolute', top: 18, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileWrap: { marginTop: -34, paddingHorizontal: 20, marginBottom: 10 },
  profileImageWrap: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#FFFFFF', overflow: 'hidden', backgroundColor: '#FFFFFF' },
  profileImage: { width: '100%', height: '100%' },
  badge: { marginTop: -8, alignSelf: 'flex-start', marginLeft: 18, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { color: '#344054', fontSize: 13, fontWeight: '700' },
  gradeA: { backgroundColor: '#FFD5D2' },
  gradeB: { backgroundColor: '#FFF3BF' },
  gradeC: { backgroundColor: '#D1FADF' },
  ambulanceCode: { paddingHorizontal: 20, color: '#202531', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  hospitalName: { paddingHorizontal: 20, color: '#202531', fontSize: 18, lineHeight: 30, marginBottom: 10 },
  statusRow: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statusText: { fontSize: 16 },
  available: { color: '#15803D' },
  unavailable: { color: '#667085' },
  distanceText: { color: '#8A98B3', fontSize: 15 },
  metaRow: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  metaText: { color: '#98A2B3', fontSize: 15 },
  callButton: { marginHorizontal: 20, minHeight: 44, borderRadius: 4, backgroundColor: '#0F4CBA', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginBottom: 18 },
  callButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  copyRow: { textAlign: 'center', color: '#202531', fontSize: 17, marginBottom: 26 },
  copyLink: { color: '#155EEF', textDecorationLine: 'underline' },
  sectionHeader: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { color: '#4B5563', fontSize: 18, fontWeight: '700' },
  sectionLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sectionLink: { color: '#202531', fontSize: 14 },
  reviewCard: { marginHorizontal: 20, borderWidth: 1, borderColor: '#E5EAF2', borderRadius: 10, padding: 14, flexDirection: 'row', gap: 12, backgroundColor: '#FFFFFF', marginBottom: 18 },
  reviewMain: { flex: 1 },
  reviewText: { color: '#202531', fontSize: 15, lineHeight: 25, marginBottom: 12 },
  reviewName: { color: '#667085', fontSize: 15, marginBottom: 6 },
  reviewDept: { color: '#8A98B3', fontSize: 15 },
  reviewScore: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-end' },
  reviewScoreText: { color: '#202531', fontSize: 15 },
  reviewModal: { marginTop: 10, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 30, borderWidth: 1, borderColor: '#E5EAF2' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  reviewTitle: { color: '#1F2937', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  reviewSubtitle: { color: '#667085', fontSize: 15, lineHeight: 24, marginBottom: 18 },
  inputBox: { minHeight: 110, borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 },
  inputPlaceholder: { color: '#98A2B3', fontSize: 16 },
  starsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  starWrap: { alignItems: 'center', gap: 6 },
  starLabel: { color: '#667085', fontSize: 13 },
  submitButton: { minHeight: 46, backgroundColor: '#0F4CBA', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  cancelButton: { minHeight: 46, backgroundColor: '#DCE8FB', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  cancelButtonText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
});
