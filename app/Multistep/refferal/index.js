import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  MultistepScreen,
  FieldLabel,
  FieldBox,
  PrimaryButton,
} from '../shared';

const specialties = ['Surgeon', 'Pediatrician'];

export default function PatientReferralScreen() {
  const router = useRouter();

  return (
    <MultistepScreen
      currentStep="refferal"
      footer={
        <PrimaryButton
          label="Enter Patient's Detail"
          onPress={() => router.push('/Multistep/detail')}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />}
        />
      }
    >
      <Text style={styles.sectionTitle}>Receiving Department</Text>

      <FieldLabel>Name of Department</FieldLabel>
      <FieldBox style={styles.neutralField}>
        <Text style={styles.fieldText}>Hematology</Text>
      </FieldBox>

      <FieldLabel>Receiving Facility</FieldLabel>
      <FieldBox>
        <View style={styles.rowBetween}>
          <Text style={styles.fieldText}>Mulago National Referral Hospital</Text>
          <View style={styles.trailingRow}>
            <View style={styles.facilityBadge}>
              <Text style={styles.facilityBadgeText}>NRH</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color="#667085" />
          </View>
        </View>
      </FieldBox>

      <FieldLabel>Specialty</FieldLabel>
      <FieldBox>
        <View style={styles.rowBetween}>
          <View style={styles.specialtyWrap}>
            {specialties.map((item) => (
              <View key={item} style={styles.specialtyChip}>
                <Text style={styles.specialtyText}>{item}</Text>
                <Ionicons name="close" size={16} color="#667085" />
              </View>
            ))}
          </View>
          <Pressable hitSlop={8}>
            <Ionicons name="chevron-down" size={18} color="#667085" />
          </Pressable>
        </View>
      </FieldBox>
    </MultistepScreen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#2B3445',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 18,
    marginTop: 4,
  },
  neutralField: {
    borderColor: '#7B8798',
  },
  fieldText: {
    color: '#1E293B',
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  trailingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  facilityBadge: {
    backgroundColor: '#18C0C8',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  facilityBadgeText: {
    color: '#114B5F',
    fontSize: 13,
    fontWeight: '700',
  },
  specialtyWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  specialtyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2F7',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  specialtyText: {
    color: '#495466',
    fontSize: 14,
  },
});
