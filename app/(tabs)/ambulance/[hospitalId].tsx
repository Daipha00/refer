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

export default function AmbulanceListScreen() {
  const router = useRouter();
  const { hospitalId } = useLocalSearchParams<{ hospitalId: string }>();
  const hospital = hospitalProfiles[hospitalId as keyof typeof hospitalProfiles] ?? hospitalProfiles.uci;
  const ambulances = hospital.ambulances ?? [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.profileWrap}>
            <Ionicons name="person-circle-outline" size={60} color="#A9B5C8" />
          </View>
          <View style={styles.headerIcons}>
            <View style={styles.alertItem}>
              <View style={styles.emergencyIconWrap}>
                <MaterialCommunityIcons name="stethoscope" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.headerIconLabel}>emergency</Text>
            </View>
            <Pressable hitSlop={8}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.greeting}>Good Morning Dr. John</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.locationText}>Plot 14, Old Kampala Road, Kampala</Text>
        </View>

        <Pressable style={styles.searchBar}>
          <View style={styles.searchLeft}>
            <Feather name="search" size={18} color="#748196" />
            <Text style={styles.searchText}>search by name, specialty, hospital or city</Text>
          </View>
          <MaterialCommunityIcons name="tune-variant" size={20} color="#748196" />
        </Pressable>

        <View style={styles.inlineTabs}>
          <Pressable style={styles.inlineTab} onPress={() => router.replace('/(tabs)')}>
            <View style={styles.inlineTabLabel}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#4B5563" />
              <Text style={styles.inlineTabText}>Hospital</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.inlineTab, styles.inlineTabActive]}>
            <View style={styles.inlineTabLabel}>
              <MaterialCommunityIcons name="ambulance" size={16} color="#2563EB" />
              <Text style={[styles.inlineTabText, styles.inlineTabTextActive]}>Ambulance</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Facility</Text>
            <Text style={styles.sectionSubtitle}>by: <Text style={styles.sectionLink}>National Referral Hospitals</Text></Text>
          </View>
          <View style={styles.sectionLinkRow}>
            <Text style={styles.seeMoreText}>see more</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </View>
        </View>

        <View style={styles.grid}>
          {ambulances.map((ambulance) => (
            <Pressable
              key={ambulance.id}
              style={styles.card}
              onPress={() => router.push(`/ambulance/${hospital.id}/${ambulance.id}`)}
            >
              <Image source={ambulance.image} style={styles.cardImage} />
              <Text style={styles.cardCode}>{ambulance.code}</Text>
              <Text style={styles.cardHospital}>{hospital.name}</Text>
              <Text style={[styles.cardStatus, ambulance.status === 'Available' ? styles.available : styles.unavailable]}>
                {ambulance.status}
              </Text>
              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>Grade</Text>
                <View style={[styles.gradeBadge, ambulance.grade === 'A' ? styles.gradeA : ambulance.grade === 'B' ? styles.gradeB : styles.gradeC]}>
                  <Text style={styles.gradeText}>{ambulance.grade}</Text>
                </View>
                <AntDesign name="star" size={13} color="#D4A600" />
                <Text style={styles.metaText}>{ambulance.rating}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  profileWrap: { justifyContent: 'center', alignItems: 'center' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  alertItem: { alignItems: 'center', gap: 4 },
  emergencyIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#D92D20', alignItems: 'center', justifyContent: 'center' },
  headerIconLabel: { color: '#6B7280', fontSize: 12 },
  greeting: { color: '#202531', fontSize: 22, fontWeight: '700', marginBottom: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
  locationText: { color: '#6B7280', fontSize: 15 },
  searchBar: { minHeight: 48, borderRadius: 24, borderWidth: 1, borderColor: '#D3DBE6', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  searchLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  searchText: { color: '#8A98B3', fontSize: 15, flexShrink: 1 },
  inlineTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5EAF2', marginHorizontal: -20, paddingHorizontal: 20, marginBottom: 20 },
  inlineTab: { flex: 1, paddingBottom: 14, alignItems: 'center' },
  inlineTabActive: { borderBottomWidth: 2, borderBottomColor: '#2563EB' },
  inlineTabLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inlineTabText: { color: '#4B5563', fontSize: 15 },
  inlineTabTextActive: { color: '#2563EB' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  sectionTitle: { color: '#4B5563', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  sectionSubtitle: { color: '#6B7280', fontSize: 13 },
  sectionLink: { color: '#2563EB' },
  sectionLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  seeMoreText: { color: '#202531', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', borderWidth: 1, borderColor: '#E5EAF2', borderRadius: 6, overflow: 'hidden', marginBottom: 16, backgroundColor: '#FFFFFF' },
  cardImage: { width: '100%', height: 138 },
  cardCode: { color: '#202531', fontSize: 15, marginTop: 10, marginBottom: 8, paddingHorizontal: 10 },
  cardHospital: { color: '#475467', fontSize: 14, lineHeight: 22, paddingHorizontal: 10, marginBottom: 8 },
  cardStatus: { fontSize: 14, paddingHorizontal: 10, marginBottom: 10 },
  available: { color: '#15803D' },
  unavailable: { color: '#667085' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 10, paddingBottom: 12 },
  metaText: { color: '#344054', fontSize: 14 },
  gradeBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  gradeA: { backgroundColor: '#FFD5D2' },
  gradeB: { backgroundColor: '#FFF3BF' },
  gradeC: { backgroundColor: '#D1FADF' },
  gradeText: { color: '#344054', fontSize: 13 },
});
