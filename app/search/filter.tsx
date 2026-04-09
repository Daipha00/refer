import React, { useState } from 'react';
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

const hospitalGroups = [
  {
    title: 'National Referral Hospital',
    count: '1,001',
    items: [
      { name: 'Mbarara University Teaching Hospital', count: '101' },
      { name: 'Uganda Cancer Institute National Referral Hospital', count: '48' },
      { name: 'Butabika National Referral Hospital', count: '97' },
      { name: 'Uganda Heart Institute National Referral Hospital', count: '77' },
      { name: 'Entebbe National Referral Hospital for Infectious Diseases', count: '20' },
    ],
  },
  { title: 'Regional Referral Hospital', count: '557', items: [] },
  { title: 'General Hospital', count: '325', items: [] },
  { title: 'Health center IV', count: '148', items: [] },
  { title: 'Health center III', count: '79', items: [] },
  { title: 'Health center II', count: '20', items: [] },
  { title: 'Health center I', count: '10', items: [] },
];

const departments = [
  { title: 'Psychology', icon: 'head-cog-outline' },
  { title: 'Urologist', icon: 'kidney' },
  { title: 'Nephrology', icon: 'kidney-outline' },
  { title: 'Ophthalmologist', icon: 'eye-outline' },
  { title: 'Rheumatologist', icon: 'hand-back-right-outline' },
  { title: 'Hematologist', icon: 'water-outline' },
];

const ratings = [0, 5];
const availabilityOptions = ['All', 'Online', 'Offline'];

function FilterCard({ title, onClose, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <Ionicons name="close-circle-outline" size={20} color="#BAC4D4" />
        </Pressable>
      </View>
      {children}
    </View>
  );
}

export default function FilterScreen() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(5);
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [hospitalScope, setHospitalScope] = useState<'Public' | 'Private'>('Public');
  const [distanceValue, setDistanceValue] = useState(0.9);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
          <Text style={styles.headerTitle}>Filter</Text>
        </View>

        <FilterCard title="Filter" onClose={() => router.back()}>
          <Pressable style={styles.filterRow}>
            <Text style={styles.filterLabel}>Hospital</Text>
            <View style={styles.filterValueWrap}>
              <Text style={styles.filterValue}>All</Text>
              <Ionicons name="chevron-forward" size={16} color="#98A2B3" />
            </View>
          </Pressable>
          <Pressable style={styles.filterRow}>
            <Text style={styles.filterLabel}>Distance</Text>
            <View style={styles.filterValueWrap}>
              <Text style={styles.filterValue}>from 0 km</Text>
              <Ionicons name="chevron-forward" size={16} color="#98A2B3" />
            </View>
          </Pressable>
          <Pressable style={styles.filterRow}>
            <Text style={styles.filterLabel}>Department</Text>
            <View style={styles.filterValueWrap}>
              <Text style={styles.filterValue}>All</Text>
              <Ionicons name="chevron-forward" size={16} color="#98A2B3" />
            </View>
          </Pressable>
          <Pressable style={styles.filterRow}>
            <Text style={styles.filterLabel}>Availability</Text>
            <View style={styles.filterValueWrap}>
              <Text style={styles.filterValue}>All</Text>
              <Ionicons name="chevron-forward" size={16} color="#98A2B3" />
            </View>
          </Pressable>
          <Pressable style={[styles.filterRow, styles.filterRowLast]}>
            <Text style={styles.filterLabel}>Review</Text>
            <Ionicons name="chevron-forward" size={16} color="#98A2B3" />
          </Pressable>
        </FilterCard>

        <FilterCard title="Department" onClose={() => router.back()}>
          <View style={styles.selectHeader}>
            <Text style={styles.selectHeaderText}>Medical Doctor</Text>
            <Ionicons name="chevron-down-outline" size={18} color="#344054" />
          </View>
          <View style={styles.departmentGrid}>
            {departments.map((item) => (
              <View key={item.title} style={styles.departmentChip}>
                {item.icon === 'kidney' || item.icon === 'kidney-outline' ? (
                  <MaterialCommunityIcons name={item.icon as 'kidney' | 'kidney-outline'} size={13} color="#667085" />
                ) : item.icon === 'head-cog-outline' ? (
                  <MaterialCommunityIcons name="head-cog-outline" size={13} color="#667085" />
                ) : (
                  <Ionicons
                    name={item.icon as 'eye-outline' | 'water-outline' | 'hand-back-right-outline'}
                    size={13}
                    color="#667085"
                  />
                )}
                <Text style={styles.departmentChipText}>{item.title}</Text>
              </View>
            ))}
          </View>
          <Pressable>
            <Text style={styles.linkText}>click to see more</Text>
          </Pressable>
          {['Nurse', 'Midwife', 'Nutritionist'].map((item) => (
            <View key={item} style={styles.selectHeaderSecondary}>
              <Text style={styles.selectHeaderText}>{item}</Text>
              <Ionicons name="chevron-down-outline" size={18} color="#344054" />
            </View>
          ))}
        </FilterCard>

        <FilterCard title="Hospital" onClose={() => router.back()}>
          <View style={styles.scopeTabs}>
            {['Public', 'Private'].map((item) => (
              <Pressable
                key={item}
                style={[styles.scopeTab, hospitalScope === item && styles.scopeTabActive]}
                onPress={() => setHospitalScope(item as 'Public' | 'Private')}
              >
                <Text style={[styles.scopeTabText, hospitalScope === item && styles.scopeTabTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {hospitalGroups.map((group) => (
            <View key={group.title} style={styles.hospitalGroup}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupTitle}>{group.title}</Text>
                <View style={styles.groupHeaderRight}>
                  <Text style={styles.groupCount}>{group.count}</Text>
                  <Ionicons name="chevron-down-outline" size={16} color="#475467" />
                </View>
              </View>

              {group.items.map((item) => (
                <View key={item.name} style={styles.hospitalRow}>
                  <Ionicons name="square-outline" size={16} color="#BAC4D4" />
                  <Text style={styles.hospitalRowText}>{item.name}</Text>
                  <Text style={styles.hospitalRowCount}>{item.count}</Text>
                </View>
              ))}
            </View>
          ))}

          <Pressable>
            <Text style={[styles.linkText, styles.hospitalLink]}>click to see more</Text>
          </Pressable>
        </FilterCard>

        <FilterCard title="Distance" onClose={() => router.back()}>
          <View style={styles.distanceInput}>
            <Text style={styles.distanceValue}>{distanceValue.toFixed(1)}</Text>
            <Text style={styles.distanceUnit}>km</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${(distanceValue / 3) * 100}%` }]} />
            <View style={[styles.sliderThumb, { left: `${(distanceValue / 3) * 100}%` }]} />
          </View>
          <View style={styles.distanceLabels}>
            <Text style={styles.distanceLabel}>State</Text>
            <Text style={styles.distanceLabel}>Regional</Text>
            <Text style={styles.distanceLabel}>National</Text>
          </View>
        </FilterCard>

        <FilterCard title="Reviews" onClose={() => router.back()}>
          {ratings.map((rating) => (
            <Pressable key={rating} style={styles.ratingRow} onPress={() => setSelectedRating(rating)}>
              <View style={styles.starsWrap}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={34}
                    color={rating !== 0 && star <= rating ? '#F4C430' : '#C8D0DA'}
                  />
                ))}
              </View>
              <View style={styles.ratingLabels}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={styles.ratingLabel}>
                    {star}
                  </Text>
                ))}
              </View>
              {selectedRating === rating ? <View style={styles.ratingCheck} /> : null}
            </Pressable>
          ))}
        </FilterCard>

        <FilterCard title="Availability" onClose={() => router.back()}>
          {availabilityOptions.map((item) => (
            <Pressable key={item} style={styles.availabilityRow} onPress={() => setSelectedAvailability(item)}>
              <View style={[styles.radioOuter, selectedAvailability === item && styles.radioOuterActive]}>
                {selectedAvailability === item ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.availabilityText}>{item}</Text>
            </Pressable>
          ))}
        </FilterCard>

        <View style={styles.toggleRow}>
          <Text style={[styles.togglePill, styles.togglePillMuted]}>All</Text>
          <Text style={[styles.togglePill, styles.togglePillActive]}>All</Text>
        </View>

        <View style={styles.alertsWrap}>
          <View style={[styles.alertCard, styles.alertHigh]}>
            <Feather name="alert-triangle" size={16} color="#D92D20" />
            <Text style={styles.alertTextHigh}>This case has a high emergency level and requires urgent attention.</Text>
          </View>
          <View style={[styles.alertCard, styles.alertMedium]}>
            <Feather name="alert-triangle" size={16} color="#A15C07" />
            <Text style={styles.alertTextMedium}>This case has a mid-level emergency and should be addressed soon.</Text>
          </View>
          <View style={[styles.alertCard, styles.alertLow]}>
            <Feather name="alert-triangle" size={16} color="#117A4B" />
            <Text style={styles.alertTextLow}>This case has a low emergency level and can be handled at a routine pace.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 14,
    color: '#202531',
    fontSize: 18,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitle: {
    color: '#202531',
    fontSize: 16,
    fontWeight: '600',
  },
  filterRow: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#E5EAF2',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterRowLast: {
    marginBottom: 0,
  },
  filterLabel: {
    color: '#202531',
    fontSize: 15,
  },
  filterValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterValue: {
    color: '#98A2B3',
    fontSize: 14,
  },
  selectHeader: {
    minHeight: 38,
    backgroundColor: '#EEF2F6',
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectHeaderSecondary: {
    minHeight: 38,
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#E5EAF2',
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  selectHeaderText: {
    color: '#344054',
    fontSize: 14,
  },
  departmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  departmentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F7F9FC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  departmentChipText: {
    color: '#667085',
    fontSize: 12,
  },
  linkText: {
    color: '#2563EB',
    fontSize: 12,
  },
  scopeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    padding: 3,
    marginBottom: 14,
  },
  scopeTab: {
    flex: 1,
    minHeight: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scopeTabActive: {
    backgroundColor: '#FFFFFF',
  },
  scopeTabText: {
    color: '#667085',
    fontSize: 13,
  },
  scopeTabTextActive: {
    color: '#202531',
    fontWeight: '600',
  },
  hospitalGroup: {
    marginBottom: 12,
  },
  groupHeader: {
    minHeight: 32,
    backgroundColor: '#EEF2F6',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  groupTitle: {
    color: '#344054',
    fontSize: 13,
  },
  groupHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupCount: {
    color: '#667085',
    fontSize: 12,
  },
  hospitalRow: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  hospitalRowText: {
    flex: 1,
    color: '#667085',
    fontSize: 13,
    marginLeft: 8,
    marginRight: 10,
  },
  hospitalRowCount: {
    color: '#667085',
    fontSize: 12,
  },
  hospitalLink: {
    alignSelf: 'flex-end',
  },
  distanceInput: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  distanceValue: {
    color: '#667085',
    fontSize: 14,
  },
  distanceUnit: {
    color: '#667085',
    fontSize: 14,
  },
  sliderTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#DCE8FB',
    marginBottom: 16,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: '#2563EB',
  },
  sliderThumb: {
    position: 'absolute',
    top: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#1747AF',
    marginLeft: -9,
  },
  distanceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  distanceLabel: {
    color: '#98A2B3',
    fontSize: 12,
  },
  ratingRow: {
    marginBottom: 18,
  },
  starsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  ratingLabel: {
    color: '#98A2B3',
    fontSize: 12,
  },
  ratingCheck: {
    position: 'absolute',
    right: -4,
    top: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  radioOuterActive: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  availabilityText: {
    color: '#475467',
    fontSize: 15,
  },
  toggleRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: 4,
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#101828',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 4,
  },
  togglePill: {
    minWidth: 54,
    textAlign: 'center',
    borderRadius: 999,
    paddingVertical: 10,
    fontSize: 15,
  },
  togglePillMuted: {
    color: '#667085',
    backgroundColor: '#F2F4F7',
    marginRight: 8,
  },
  togglePillActive: {
    color: '#FFFFFF',
    backgroundColor: '#2563EB',
  },
  alertsWrap: {
    gap: 12,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  alertHigh: {
    backgroundColor: '#FEEEEE',
  },
  alertMedium: {
    backgroundColor: '#FFF7E5',
  },
  alertLow: {
    backgroundColor: '#EBF9F1',
  },
  alertTextHigh: {
    flex: 1,
    color: '#D92D20',
    fontSize: 13,
    lineHeight: 20,
  },
  alertTextMedium: {
    flex: 1,
    color: '#A15C07',
    fontSize: 13,
    lineHeight: 20,
  },
  alertTextLow: {
    flex: 1,
    color: '#117A4B',
    fontSize: 13,
    lineHeight: 20,
  },
});
