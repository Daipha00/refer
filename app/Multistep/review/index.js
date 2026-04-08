import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  MultistepScreen,
  SectionCard,
  DetailRow,
  PrimaryButton,
  sharedStyles,
} from '../shared';

const documents = [
  { id: 'png', type: 'PNG', name: 'Jane-deo...', size: '2.50 MB', color: '#3B82F6' },
  { id: 'pdf', type: 'PDF', name: 'Jane-deo...', size: '1.02 MB', color: '#F97316' },
];

function EditSectionButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.editButton}>
      <Text style={styles.editButtonText}>Edit section</Text>
      <Feather name="edit-2" size={18} color="#5A6475" />
    </Pressable>
  );
}

export default function ReviewScreen() {
  const router = useRouter();

  return (
    <MultistepScreen
      currentStep="review"
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          label="Send Referral"
          onPress={() => router.push('/Multistep/successReferral')}
          icon={<MaterialIcons name="add" size={20} color="#FFFFFF" />}
        />
      }
    >
      <View style={styles.alertBox}>
        <Feather name="alert-triangle" size={18} color="#C62828" />
        <Text style={styles.alertText}>
          This case has a high emergency level and requires urgent attention.
        </Text>
      </View>

      <SectionCard title="Patient Detail">
        <DetailRow label="Diagnosis" value="Congenital Pyloric Stenosis." />
        <DetailRow label="Patient's Name" value="Jane Deo" />
        <DetailRow label="Age" value="2 Months" />
        <DetailRow label="Sex" value="Female" />
        <DetailRow label="Medical Documents">
          <View style={styles.documentRow}>
            {documents.map((item) => (
              <View key={item.id} style={styles.miniDoc}>
                <View style={[styles.miniDocIcon, { backgroundColor: `${item.color}18` }]}>
                  <Text style={[styles.miniDocIconText, { color: item.color }]}>{item.type}</Text>
                </View>
                <Text style={styles.miniDocName}>{item.name}</Text>
                <Text style={styles.miniDocSize}>{item.size}</Text>
              </View>
            ))}
          </View>
        </DetailRow>
        <DetailRow label="Additional Note" value="-" />
        <EditSectionButton onPress={() => router.push('/Multistep/detail')} />
      </SectionCard>

      <SectionCard title="Referring Detail">
        <DetailRow label="Receiving Department" value="Hematology" />
        <DetailRow label="Receiving Facility">
          <View>
            <Text style={styles.valueText}>Mulago National Referral Hospital</Text>
            <View style={[sharedStyles.chip, styles.nrhChip]}>
              <Text style={[sharedStyles.chipText, styles.nrhChipText]}>NRH</Text>
            </View>
          </View>
        </DetailRow>
        <DetailRow label="Referring Personnel" value="John Edet" divider />
        <DetailRow label="Medical Profession" value="Doctor" />
        <DetailRow label="Profession Level" value="Medical Officer" />
        <DetailRow label="Phone Number" value="+256 772 123 456" />
        <DetailRow label="Specialty">
          <View style={styles.specialtyPill}>
            <Text style={styles.specialtyPillText}>Radiologist</Text>
          </View>
        </DetailRow>
        <DetailRow label="Referring Department" value="Pediatrics" />
        <DetailRow label="Receiving Facility">
          <View>
            <Text style={styles.valueText}>Mbarara Regional Referral Hospital</Text>
            <View style={[sharedStyles.chip, styles.rrhChip]}>
              <Text style={[sharedStyles.chipText, styles.rrhChipText]}>RRH</Text>
            </View>
          </View>
        </DetailRow>
        <EditSectionButton onPress={() => router.push('/Multistep/refferal')} />
      </SectionCard>
    </MultistepScreen>
  );
}

const styles = StyleSheet.create({
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FEEEEE',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  alertText: {
    flex: 1,
    color: '#C62828',
    fontSize: 14,
    lineHeight: 22,
  },
  documentRow: {
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  miniDoc: {
    width: 74,
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  miniDocIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  miniDocIconText: {
    fontSize: 11,
    fontWeight: '700',
  },
  miniDocName: {
    color: '#4B5563',
    fontSize: 12,
    marginBottom: 2,
  },
  miniDocSize: {
    color: '#9AA5B5',
    fontSize: 12,
  },
  editButton: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  editButtonText: {
    color: '#5A6475',
    fontSize: 16,
    fontWeight: '500',
  },
  valueText: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 24,
  },
  nrhChip: {
    backgroundColor: '#C9FBFF',
    marginTop: 6,
  },
  nrhChipText: {
    color: '#116476',
  },
  rrhChip: {
    backgroundColor: '#2454D3',
    marginTop: 6,
  },
  rrhChipText: {
    color: '#FFFFFF',
  },
  specialtyPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  specialtyPillText: {
    color: '#3E4B5E',
    fontSize: 14,
  },
});
