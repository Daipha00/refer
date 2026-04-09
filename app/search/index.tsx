import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const departmentResults = [
  { id: 'oph', title: 'Opthalmology', hospitals: '87 Hospitals', icon: 'eye-outline', color: '#D7E5FB' },
  { id: 'uro', title: 'Urology', hospitals: '39 Hospitals', icon: 'kidney', color: '#E4ECE6' },
  { id: 'hema', title: 'Hematology', hospitals: '12 Hospitals', icon: 'water-outline', color: '#F9D6D7' },
  { id: 'gyn', title: 'Gynecology', hospitals: '107 Hospitals', icon: 'female-outline', color: '#F0C7FA' },
];

export default function SearchScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
          <Text style={styles.title}>Search</Text>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.searchLeft}>
            <Feather name="search" size={18} color="#748196" />
            <Text style={styles.searchText}>search by name, specialty, hospital or city</Text>
          </View>
          <Pressable onPress={() => router.push('/search/filter')} hitSlop={8}>
            <MaterialCommunityIcons name="tune-variant" size={20} color="#748196" />
          </Pressable>
        </View>

        <View style={styles.topTabs}>
          <Pressable style={[styles.topTab, styles.topTabActive]}>
            <View style={styles.topTabLabel}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#2563EB" />
              <Text style={[styles.topTabText, styles.topTabTextActive]}>Hospital</Text>
            </View>
          </Pressable>
          <Pressable style={styles.topTab}>
            <View style={styles.topTabLabel}>
              <MaterialCommunityIcons name="ambulance" size={16} color="#4B5563" />
              <Text style={styles.topTabText}>Ambulance</Text>
            </View>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <Pressable style={[styles.filterChip, styles.filterChipActive]}>
            <Text style={[styles.filterChipText, styles.filterChipTextActive]}>All</Text>
          </Pressable>
          <Pressable style={styles.filterChip} onPress={() => router.push('/search/filter')}>
            <Text style={styles.filterChipText}>Department</Text>
            <Ionicons name="chevron-down" size={16} color="#202531" />
          </Pressable>
          <Pressable style={styles.filterChip} onPress={() => router.push('/search/filter')}>
            <Text style={styles.filterChipText}>Hospital</Text>
            <Ionicons name="chevron-down" size={16} color="#202531" />
          </Pressable>
          <Pressable style={styles.filterChip} onPress={() => router.push('/search/filter')}>
            <Text style={styles.filterChipText}>Distance</Text>
            <Ionicons name="chevron-down" size={16} color="#202531" />
          </Pressable>
        </ScrollView>

        <View style={styles.grid}>
          {departmentResults.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => router.push('/referral/empty')}
            >
              <View style={styles.cardIcon}>
                {item.icon === 'kidney' ? (
                  <MaterialCommunityIcons name="kidney" size={20} color="#6B7280" />
                ) : (
                  <Ionicons name={item.icon as 'eye-outline' | 'water-outline' | 'female-outline'} size={20} color="#6B7280" />
                )}
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardMetaRow}>
                <MaterialCommunityIcons name="hospital-building" size={14} color="#6B7280" />
                <Text style={styles.cardMeta}>{item.hospitals}</Text>
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
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    marginLeft: 14,
    color: '#202531',
    fontSize: 17,
    fontWeight: '700',
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
  topTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF2',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  topTab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
  },
  topTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  topTabLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topTabText: {
    color: '#4B5563',
    fontSize: 15,
  },
  topTabTextActive: {
    color: '#2563EB',
  },
  filterRow: {
    gap: 12,
    paddingBottom: 18,
  },
  filterChip: {
    minHeight: 38,
    borderRadius: 20,
    backgroundColor: '#EFF2F7',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
  },
  filterChipText: {
    color: '#202531',
    fontSize: 15,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '47.5%',
    minHeight: 146,
    borderRadius: 8,
    padding: 18,
  },
  cardIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
  },
  cardTitle: {
    color: '#202531',
    fontSize: 16,
    marginBottom: 10,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardMeta: {
    color: '#6B7280',
    fontSize: 13,
  },
});
