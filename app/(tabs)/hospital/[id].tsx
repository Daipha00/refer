import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hospitalProfiles } from '../../hospital/data';

const fallbackDepartments = [
  { id: 'cardiology', title: 'Cardiology', doctors: '12 Doctors', color: '#F8C8CD', icon: 'heart-pulse' },
  { id: 'gynecology', title: 'Gynecology', doctors: '6 Doctors', color: '#F1C4F7', icon: 'human-female-female' },
  { id: 'nephrology', title: 'Nephrology', doctors: '30 Doctors', color: '#FFE0A8', icon: 'kidney' },
  { id: 'oncology', title: 'Oncology', doctors: '18 Doctors', color: '#E8EFE6', icon: 'ribbon' },
];

const fallbackAmbulances = [
  { id: 'a1', code: 'UCI-AMB-003', status: 'Available', grade: 'A', rating: '4.5', image: require('../../../assets/images/umboardimg/Ambulance.png') },
  { id: 'a2', code: 'UCI-AMB-061', status: 'In-use (unavailable)', grade: 'C', rating: '3.7', image: require('../../../assets/images/umboardimg/Ambulance.png') },
  { id: 'a3', code: 'UCI-AMB-007', status: 'Available', grade: 'C', rating: '5.0', image: require('../../../assets/images/umboardimg/Ambulance.png') },
  { id: 'a4', code: 'UCI-AMB-010', status: 'In-use (unavailable)', grade: 'B', rating: '2.9', image: require('../../../assets/images/umboardimg/Ambulance.png') },
];

export default function HospitalProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const hospital = hospitalProfiles[id as keyof typeof hospitalProfiles] ?? hospitalProfiles.uci;
  const departments = hospital.departments ?? fallbackDepartments;
  const ambulances = hospital.ambulances ?? fallbackAmbulances;
  const review = hospital.review ?? hospitalProfiles.uci.review;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image source={hospital.image} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTopRow}>
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="chevron-back-outline" size={28} color="#FFFFFF" />
            </Pressable>
            <Pressable hitSlop={10}>
              <Feather name="search" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <View style={styles.profileWrap}>
          <View style={styles.profileImageWrap}>
            <Image source={hospital.image} style={styles.profileImage} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{hospital.shortCode}</Text>
          </View>
        </View>

        <Text style={styles.hospitalName}>{hospital.name}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="#6B7280" />
          <Text style={styles.locationText}>{hospital.address}</Text>
          <Text style={styles.distanceText}>({hospital.distance})</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Feather name="briefcase" size={15} color="#6B7280" />
            <Text style={styles.infoText}>{hospital.departmentsCount}</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="users" size={15} color="#6B7280" />
            <Text style={styles.infoText}>{hospital.doctorsCount}</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryAction} onPress={() => router.push('/referral/empty')}>
            <Text style={styles.primaryActionText}>Refer a Patient</Text>
            <Feather name="plus" size={18} color="#FFFFFF" />
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={() => router.push(`/ambulance/${hospital.id}`)}>
            <Text style={styles.secondaryActionText}>Book an ambulance</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Departments (45)</Text>
          <View style={styles.sectionLinkRow}>
            <Text style={styles.sectionLink}>See all</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </View>
        </View>

        <View style={styles.departmentGrid}>
          {departments.map((department) => (
            <Pressable
              key={department.id}
              style={[styles.departmentCard, { backgroundColor: department.color }]}
              onPress={() => router.push(`/department/${hospital.id}/${department.id}/chat-i`)}
            >
              <View style={styles.departmentIconWrap}>
                <MaterialCommunityIcons name={department.icon as 'heart-pulse' | 'human-female-female' | 'kidney' | 'ribbon'} size={20} color="#6B7280" />
              </View>
              <Text style={styles.departmentTitle}>{department.title}</Text>
              <View style={styles.departmentMetaRow}>
                <Feather name="users" size={13} color="#6B7280" />
                <Text style={styles.departmentMeta}>{department.doctors}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ambulance (4)</Text>
          <View style={styles.sectionLinkRow}>
            <Text style={styles.sectionLink}>See all</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </View>
        </View>

        <View style={styles.ambulanceGrid}>
          {ambulances.map((ambulance) => (
            <Pressable key={ambulance.id} style={styles.ambulanceCard} onPress={() => router.push(`/ambulance/${hospital.id}/${ambulance.id}`)}>
              <Image source={ambulance.image} style={styles.ambulanceImage} />
              <Text style={styles.ambulanceCode}>{ambulance.code}</Text>
              <Text style={[styles.ambulanceStatus, ambulance.status === 'Available' ? styles.available : styles.unavailable]}>
                {ambulance.status}
              </Text>
              <View style={styles.ambulanceMeta}>
                <Text style={styles.gradeLabel}>Grade</Text>
                <View style={[styles.gradeBadge, ambulance.grade === 'A' ? styles.gradeA : ambulance.grade === 'B' ? styles.gradeB : styles.gradeC]}>
                  <Text style={styles.gradeText}>{ambulance.grade}</Text>
                </View>
                <AntDesign name="star" size={13} color="#D4A600" />
                <Text style={styles.ratingText}>{ambulance.rating}</Text>
              </View>
            </Pressable>
          ))}
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingBottom: 28 },
  hero: { height: 190, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.26)' },
  heroTopRow: { position: 'absolute', top: 18, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileWrap: { marginTop: -34, paddingHorizontal: 20, marginBottom: 8 },
  profileImageWrap: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#FFFFFF', overflow: 'hidden', backgroundColor: '#FFFFFF' },
  profileImage: { width: '100%', height: '100%' },
  badge: { marginTop: -8, alignSelf: 'flex-start', marginLeft: 18, backgroundColor: '#22C7CF', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { color: '#0F4C5C', fontSize: 13, fontWeight: '700' },
  hospitalName: { paddingHorizontal: 20, color: '#202531', fontSize: 20, fontWeight: '700', lineHeight: 30, marginBottom: 10 },
  locationRow: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 14 },
  locationText: { flex: 1, color: '#2563EB', fontSize: 16, lineHeight: 24 },
  distanceText: { color: '#8A98B3', fontSize: 15, marginTop: 1 },
  infoRow: { paddingHorizontal: 20, flexDirection: 'row', gap: 18, marginBottom: 18 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { color: '#6B7280', fontSize: 15 },
  actionsRow: { paddingHorizontal: 20, flexDirection: 'row', gap: 16, marginBottom: 26 },
  primaryAction: { flex: 1, minHeight: 44, borderRadius: 4, backgroundColor: '#0F4CBA', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  primaryActionText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  secondaryAction: { flex: 1, minHeight: 44, borderRadius: 4, backgroundColor: '#DCE8FB', alignItems: 'center', justifyContent: 'center' },
  secondaryActionText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
  sectionHeader: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { color: '#4B5563', fontSize: 18, fontWeight: '700' },
  sectionLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sectionLink: { color: '#202531', fontSize: 14 },
  departmentGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 22 },
  departmentCard: { width: '48%', minHeight: 146, borderRadius: 8, padding: 18, marginBottom: 14 },
  departmentIconWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 36 },
  departmentTitle: { color: '#202531', fontSize: 16, marginBottom: 8 },
  departmentMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  departmentMeta: { color: '#6B7280', fontSize: 13 },
  ambulanceGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 22 },
  ambulanceCard: { width: '48%', borderWidth: 1, borderColor: '#E5EAF2', borderRadius: 6, overflow: 'hidden', marginBottom: 14, backgroundColor: '#FFFFFF' },
  ambulanceImage: { width: '100%', height: 136 },
  ambulanceCode: { color: '#202531', fontSize: 15, marginTop: 10, marginBottom: 8, paddingHorizontal: 10 },
  ambulanceStatus: { fontSize: 14, paddingHorizontal: 10, marginBottom: 10 },
  available: { color: '#15803D' },
  unavailable: { color: '#667085' },
  ambulanceMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, paddingBottom: 12 },
  gradeLabel: { color: '#202531', fontSize: 14 },
  gradeBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  gradeA: { backgroundColor: '#FFD5D2' },
  gradeB: { backgroundColor: '#FFF3BF' },
  gradeC: { backgroundColor: '#D1FADF' },
  gradeText: { color: '#344054', fontSize: 13 },
  ratingText: { color: '#344054', fontSize: 14 },
  reviewCard: { marginHorizontal: 20, borderWidth: 1, borderColor: '#E5EAF2', borderRadius: 10, padding: 14, flexDirection: 'row', gap: 12, backgroundColor: '#FFFFFF' },
  reviewMain: { flex: 1 },
  reviewText: { color: '#202531', fontSize: 15, lineHeight: 25, marginBottom: 12 },
  reviewName: { color: '#667085', fontSize: 15, marginBottom: 6 },
  reviewDept: { color: '#8A98B3', fontSize: 15 },
  reviewScore: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-end' },
  reviewScoreText: { color: '#202531', fontSize: 15 },
});
