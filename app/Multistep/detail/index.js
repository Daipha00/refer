import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  MultistepScreen,
  FieldLabel,
  FieldBox,
  PrimaryButton,
  sharedStyles,
} from '../shared';

const initialDocuments = [
  {
    id: 'pdf',
    type: 'PDF',
    name: 'Jane-deo Lab.pdf',
    size: '1.02 MB',
    progress: 12,
    color: '#F97316',
  },
  {
    id: 'png',
    type: 'PNG',
    name: 'Jane-deo x-ray.png',
    size: '2.5 MB',
    progress: 100,
    color: '#3B82F6',
  },
];

const emergencyLevels = [
  { key: 'Low', color: '#57C785', icon: 'signal-cellular-1-bar' },
  { key: 'Medium', color: '#F4B400', icon: 'signal-cellular-2-bar' },
  { key: 'High', color: '#EF4444', icon: 'signal-cellular-3-bar' },
];

export default function PatientDetailScreen() {
  const router = useRouter();
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedLevel, setSelectedLevel] = useState('High');

  const removeDocument = (id) => {
    setDocuments((current) => current.filter((item) => item.id !== id));
  };

  return (
    <MultistepScreen
      currentStep="detail"
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          label="Review information"
          onPress={() => router.push('/Multistep/review')}
          icon={<MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />}
        />
      }
    >
      <Text style={styles.sectionTitle}>Patient Basic detail</Text>

      <FieldLabel>Name</FieldLabel>
      <FieldBox style={styles.neutralField}>
        <Text style={styles.valueText}>Jane Deo</Text>
      </FieldBox>

      <View style={styles.inlineFields}>
        <View style={styles.inlineField}>
          <FieldLabel>Age</FieldLabel>
          <FieldBox style={styles.neutralField}>
            <Text style={styles.valueText}>2 months</Text>
          </FieldBox>
        </View>

        <View style={styles.inlineField}>
          <FieldLabel>Sex</FieldLabel>
          <FieldBox style={styles.neutralField}>
            <View style={styles.rowBetween}>
              <Text style={styles.valueText}>Female</Text>
              <Ionicons name="chevron-down" size={18} color="#667085" />
            </View>
          </FieldBox>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Diagnosis Information</Text>
      <FieldLabel>Diagnosis Title</FieldLabel>
      <FieldBox>
        <Text style={styles.valueText}>Congenital Pyloric Stenosis.</Text>
      </FieldBox>

      <FieldLabel>Medical Document</FieldLabel>
      {documents.map((item) => (
        <View key={item.id} style={styles.documentCard}>
          <View style={[styles.fileBadge, { backgroundColor: `${item.color}20` }]}>
            <Text style={[styles.fileBadgeText, { color: item.color }]}>{item.type}</Text>
          </View>

          <View style={styles.documentMain}>
            <Text style={styles.documentName}>{item.name}</Text>
            <Text style={sharedStyles.mutedText}>{item.size}</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: '#2563EB' }]} />
              </View>
              <Text style={styles.progressLabel}>{item.progress}%</Text>
            </View>
          </View>

          <Pressable onPress={() => removeDocument(item.id)} style={styles.deleteButton}>
            <Feather name="trash-2" size={18} color="#6B7280" />
          </Pressable>
        </View>
      ))}

      <View style={styles.uploadBox}>
        <View style={styles.uploadIconWrap}>
          <Feather name="upload-cloud" size={22} color="#667085" />
        </View>
        <Text style={styles.uploadTitle}>Upload a document or an image file</Text>
        <Text style={styles.uploadMeta}>pdf, jpg, png, doc, docx, txt</Text>
        <Text style={styles.uploadMeta}>(10 MB Max)</Text>
      </View>

      <Text style={[sharedStyles.mutedText, styles.helpText]}>
        Include lab results, imaging scans, medical notes, or any other files that can help the
        receiving personnel provide the best care.
      </Text>

      <FieldLabel style={styles.notesLabel}>Additional Notes</FieldLabel>
      <TextInput
        multiline
        textAlignVertical="top"
        style={styles.notesInput}
        placeholder="Write any other observation here...."
        placeholderTextColor="#9AA5B5"
        defaultValue=""
      />

      <FieldLabel style={styles.notesLabel}>Emergency Level</FieldLabel>
      <View style={styles.emergencyRow}>
        {emergencyLevels.map((level) => {
          const active = selectedLevel === level.key;
          return (
            <Pressable
              key={level.key}
              onPress={() => setSelectedLevel(level.key)}
              style={styles.emergencyOption}
            >
              <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                {active ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.emergencyText}>{level.key}</Text>
              <MaterialIcons name={level.icon} size={18} color={level.color} />
            </Pressable>
          );
        })}
      </View>
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
  valueText: {
    color: '#1E293B',
    fontSize: 15,
  },
  inlineFields: {
    flexDirection: 'row',
    gap: 16,
  },
  inlineField: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#E3E8F0',
    marginVertical: 8,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCE3EE',
    padding: 12,
    marginBottom: 14,
  },
  fileBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  fileBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  documentMain: {
    flex: 1,
  },
  documentName: {
    color: '#1F2937',
    fontSize: 15,
    marginBottom: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  progressLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C6D0DE',
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  uploadIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8DEE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: {
    color: '#2B3445',
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadMeta: {
    color: '#7C8AA5',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  helpText: {
    marginTop: 12,
  },
  notesLabel: {
    marginTop: 18,
  },
  notesInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#D3DBE6',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#1E293B',
    fontSize: 15,
  },
  emergencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    marginTop: 4,
  },
  emergencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#C7D0DC',
    alignItems: 'center',
    justifyContent: 'center',
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
  emergencyText: {
    color: '#1F2937',
    fontSize: 15,
  },
});
