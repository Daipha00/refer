import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const hospitals = [
  {
    id: 'uci',
    name: 'Uganda Cancer Institute National Referral Hospital',
    departments: '42 Departments',
    distance: '45 km away',
    image: require('../../assets/images/umboardimg/hospi.png'),
  },
  {
    id: 'butabika',
    name: 'Butabika National Referral Hospital',
    departments: '56 Departments',
    distance: '2 km away',
    image: require('../../assets/images/umboardimg/hospit.png'),
  },
  {
    id: 'uhi',
    name: 'Uganda Heart Institute National Referral Hospital',
    departments: '112 Departments',
    distance: '1 km away',
    image: require('../../assets/images/umboardimg/nurs.png'),
  },
  {
    id: 'entebbe',
    name: 'Entebbe National Referral Hospital for Infectious Dise...',
    departments: '211 Departments',
    distance: '2 km away',
    image: require('../../assets/images/umboardimg/hospi.png'),
  },
];

const departments = [
  { id: 'oph', title: 'Opthalmology', hospitals: '87 Hospitals', icon: 'eye-outline', color: '#D7E5FB' },
  { id: 'uro', title: 'Urology', hospitals: '39 Hospitals', icon: 'kidney', color: '#E4ECE6' },
  { id: 'hema', title: 'Hematology', hospitals: '12 Hospitals', icon: 'water-outline', color: '#F9D6D7' },
  { id: 'gyn', title: 'Gynecology', hospitals: '107 Hospitals', icon: 'female-outline', color: '#F0C7FA' },
];

function SearchBar({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.searchBar}>
      <View style={styles.searchLeft}>
        <Feather name="search" size={18} color="#748196" />
        <Text style={styles.searchText}>search by name, specialty, hospital or city</Text>
      </View>
      <MaterialCommunityIcons name="tune-variant" size={20} color="#748196" />
    </Pressable>
  );
}

function SectionHeader({ title, subtitle, onPress }: { title: string; subtitle: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>by: <Text style={styles.sectionLink}>{subtitle}</Text></Text>
      </View>
      <Pressable onPress={onPress}>
        <View style={styles.seeMoreRow}>
          <Text style={styles.seeMoreText}>see more</Text>
          <Ionicons name="chevron-forward" size={16} color="#6B7280" />
        </View>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

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

        <SearchBar onPress={() => router.push('/search')} />

        <View style={styles.inlineTabs}>
          <Pressable style={[styles.inlineTab, styles.inlineTabActive]}>
            <View style={styles.inlineTabLabel}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#2563EB" />
              <Text style={[styles.inlineTabText, styles.inlineTabTextActive]}>Hospital</Text>
            </View>
          </Pressable>
          <Pressable style={styles.inlineTab}>
            <View style={styles.inlineTabLabel}>
              <MaterialCommunityIcons name="ambulance" size={16} color="#4B5563" />
              <Text style={styles.inlineTabText}>Ambulance</Text>
            </View>
          </Pressable>
        </View>

        <SectionHeader title="Hospitals" subtitle="National Referral Hospitals" onPress={() => router.push('/search')} />
        <View style={styles.hospitalGrid}>
          {hospitals.map((hospital) => (
            <Pressable
              key={hospital.id}
              style={styles.hospitalCard}
              onPress={() => router.push('/referral/empty')}
            >
              <Image source={hospital.image} style={styles.hospitalImage} />
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <View style={styles.metaRow}>
                <Feather name="briefcase" size={13} color="#6B7280" />
                <Text style={styles.metaText}>{hospital.departments}</Text>
                <Text style={styles.metaText}>{hospital.distance}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Departments" subtitle="Most Hospitals Offering" onPress={() => router.push('/search')} />
        <View style={styles.departmentGrid}>
          {departments.map((department) => (
            <Pressable
              key={department.id}
              style={[styles.departmentCard, { backgroundColor: department.color }]}
              onPress={() => router.push('/referral/empty')}
            >
              <View style={styles.departmentIconWrap}>
                {department.icon === 'kidney' ? (
                  <MaterialCommunityIcons name="kidney" size={20} color="#6B7280" />
                ) : (
                  <Ionicons name={department.icon as 'eye-outline' | 'water-outline' | 'female-outline'} size={20} color="#6B7280" />
                )}
              </View>
              <Text style={styles.departmentTitle}>{department.title}</Text>
              <View style={styles.departmentMetaRow}>
                <MaterialCommunityIcons name="hospital-building" size={14} color="#6B7280" />
                <Text style={styles.departmentMeta}>{department.hospitals}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  profileWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  alertItem: {
    alignItems: 'center',
    gap: 4,
  },
  emergencyIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D92D20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  greeting: {
    color: '#202531',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  locationText: {
    color: '#6B7280',
    fontSize: 15,
  },
  searchBar: {
    minHeight: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D3DBE6',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  searchText: {
    color: '#8A98B3',
    fontSize: 15,
    flexShrink: 1,
  },
  inlineTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF2',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inlineTab: {
    flex: 1,
    paddingBottom: 14,
    alignItems: 'center',
  },
  inlineTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  inlineTabLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inlineTabText: {
    color: '#4B5563',
    fontSize: 15,
  },
  inlineTabTextActive: {
    color: '#2563EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#4B5563',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 13,
  },
  sectionLink: {
    color: '#2563EB',
  },
  seeMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeMoreText: {
    color: '#202531',
    fontSize: 14,
  },
  hospitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  hospitalCard: {
    width: '48%',
    marginBottom: 18,
  },
  hospitalImage: {
    width: '100%',
    height: 128,
    borderRadius: 8,
    marginBottom: 8,
  },
  hospitalName: {
    color: '#202531',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 12,
  },
  departmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  departmentCard: {
    width: '47.5%',
    minHeight: 146,
    borderRadius: 8,
    padding: 18,
  },
  departmentIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
  },
  departmentTitle: {
    color: '#202531',
    fontSize: 16,
    marginBottom: 10,
  },
  departmentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  departmentMeta: {
    color: '#6B7280',
    fontSize: 13,
  },
});
