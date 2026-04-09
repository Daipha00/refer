import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hospitalProfiles } from '../../../../hospital/data';

const departmentNames = {
  cardiology: 'Cardiology',
  gynecology: 'Gynecology',
  nephrology: 'Nephrology',
  oncology: 'Oncology',
  pediatrics: 'Pediatrics',
};

function AlertStrip() {
  return (
    <View style={styles.alertStrip}>
      <Feather name="alert-triangle" size={14} color="#D92D20" />
      <Text style={styles.alertText}>This case has a high emergency level and requires urgent attention.</Text>
    </View>
  );
}

function FormBubble({ blurred = false, right = false, footer, children }) {
  return (
    <View style={[styles.bubbleWrap, right && styles.bubbleRight]}>
      <View style={[styles.formCard, blurred && styles.formCardBlurred]}>
        <Text style={[styles.formTitle, blurred && styles.formTitleBlurred]}>Form</Text>
      </View>
      <Text style={styles.caseText}>Congenital Pyloric Stenosis.{'\n'}Mbarara Regional Referral Hospital.</Text>
      {children}
      {footer ? <Text style={[styles.footerNote, right && styles.footerNoteRight]}>{footer}</Text> : null}
    </View>
  );
}

function Composer() {
  return (
    <View style={styles.composer}>
      <Feather name="paperclip" size={20} color="#667085" />
      <Feather name="mic" size={20} color="#667085" />
      <View style={styles.inputWrap}>
        <TextInput style={styles.input} />
      </View>
      <Pressable style={styles.sendButton}>
        <Ionicons name="paper-plane-outline" size={22} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

function ThreadBubble({ author, role, text, time, tone = 'left' }) {
  return (
    <View style={[styles.threadRow, tone === 'right' && styles.threadRowRight]}>
      {tone === 'left' ? <Ionicons name="person-circle-outline" size={40} color="#AAB7CA" /> : null}
      <View style={[styles.threadBubble, tone === 'right' && styles.threadBubbleRight]}>
        {tone === 'left' ? (
          <View style={styles.threadMeta}>
            <Text style={styles.threadAuthor}>{author}</Text>
            <Text style={styles.threadRole}>{role}</Text>
          </View>
        ) : null}
        <Text style={styles.threadText}>{text}</Text>
        <Text style={styles.threadTime}>{time}</Text>
      </View>
    </View>
  );
}

export default function DepartmentChatStageScreen() {
  const router = useRouter();
  const { hospitalId, departmentId, stage } = useLocalSearchParams<{
    hospitalId: string;
    departmentId: string;
    stage: string;
  }>();

  const hospital = hospitalProfiles[hospitalId as keyof typeof hospitalProfiles] ?? hospitalProfiles.uci;
  const department = departmentNames[departmentId as keyof typeof departmentNames] ?? 'Cardiology';
  const go = (nextStage: string) => router.push(`/department/${hospital.id}/${departmentId}/${nextStage}`);

  const showMenu = stage === 'chat-vi';
  const showRejectModal = stage === 'chat-iii';
  const showReviewModal = stage === 'chat-vii';
  const showReferralCard = ['chat-i', 'chat-ii', 'chat-iii'].includes(stage ?? '');
  const showDiscussionThread = ['chat-vi', 'chat-vii'].includes(stage ?? '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>{department}</Text>
            <Text style={styles.headerSubtitle}>{hospital.name}</Text>
          </View>
          <View style={styles.headerActions}>
            <Ionicons name="call-outline" size={22} color="#667085" />
            <Pressable onPress={() => (stage === 'chat-iv' ? go('chat-vi') : null)}>
              <Ionicons name="ellipsis-vertical" size={20} color="#667085" />
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {showReferralCard ? (
            <FormBubble blurred footer="sent by Dr Gerald">
              <AlertStrip />
              {stage === 'chat-i' ? (
                <Pressable style={styles.primaryWideButton} onPress={() => go('chat-ii')}>
                  <Text style={styles.primaryWideButtonText}>Send Reminder</Text>
                  <Ionicons name="alarm-outline" size={18} color="#FFFFFF" />
                </Pressable>
              ) : null}
              {stage === 'chat-ii' ? (
                <View style={styles.actionRow}>
                  <Pressable style={styles.acceptButton} onPress={() => go('chat-iv')}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </Pressable>
                  <Pressable style={styles.declineButton} onPress={() => go('chat-iii')}>
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </Pressable>
                </View>
              ) : null}
            </FormBubble>
          ) : null}

          {stage === 'chat-iv' ? (
            <>
              <FormBubble footer="sent by Dr Gerald">
                <AlertStrip />
              </FormBubble>
              <FormBubble footer="Referral accepted by Dr Mua" />
            </>
          ) : null}

          {stage === 'chat-v' ? (
            <>
              <FormBubble footer="sent by Dr Gerald">
                <AlertStrip />
              </FormBubble>
              <FormBubble>
                <View style={styles.noteCard}>
                  <Text style={styles.noteTitle}>Rejection Decline Notice</Text>
                  <Pressable onPress={() => go('chat-vi')}>
                    <Text style={styles.noteLink}>Click to see note</Text>
                  </Pressable>
                </View>
              </FormBubble>
              <Text style={styles.inlineFooter}>Referral declined by Dr. Mua</Text>
            </>
          ) : null}

          {showDiscussionThread ? (
            <>
              <ThreadBubble
                author="Dr. Mua"
                role="Consultant"
                text="Referral case: 2-month old diagnosed with Congenital Pyloric Stenosis. Persistent vomiting and dehydration despite initial stabilization"
                time="9:03 AM"
              />
              <ThreadBubble
                author="Dr. Okello"
                role="Medical Officer"
                text="Ultrasound confirms hypertrophied pylorus. Length 18mm, thickness 4.5mm. Classic findings"
                time="9:07 AM"
              />
              <ThreadBubble
                author="Dr. Namubiru"
                role="Consultant"
                text="No complications noted. Vitals are stable after fluid resuscitation. Feeding halted for now."
                time="9:12 AM"
              />
              <ThreadBubble
                author="Dr. Ssekwewa"
                role="Consultant"
                text="Clear case for surgery. Let’s prioritize scheduling and ensure post-op monitoring for feeding progression."
                time="9:03 AM"
              />
              <ThreadBubble
                author=""
                role=""
                text="Thank you guys for the update"
                time="9:03 AM"
                tone="right"
              />
            </>
          ) : null}
        </ScrollView>

        {showMenu ? (
          <View style={styles.menuPopup}>
            <Pressable onPress={() => go('chat-vii')}>
              <Text style={styles.menuItem}>Write Review</Text>
            </Pressable>
            <Pressable onPress={() => router.push(`/ambulance/${hospital.id}`)}>
              <Text style={styles.menuItem}>Book an Ambulance</Text>
            </Pressable>
          </View>
        ) : null}

        <Composer />

        {showRejectModal ? (
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={22} color="#1F2937" />
                </Pressable>
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="close-circle-outline" size={24} color="#98A2B3" />
                </Pressable>
              </View>
              <Text style={styles.modalTitle}>Referral Rejection Notice</Text>
              <Text style={styles.modalSubtitle}>Please review the details and consider alternative steps for patient care.</Text>
              <TextInput multiline style={styles.modalInput} placeholder="Write here...." placeholderTextColor="#98A2B3" />
              <Pressable style={styles.modalPrimary} onPress={() => go('chat-v')}>
                <Text style={styles.modalPrimaryText}>Send</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {showReviewModal ? (
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={22} color="#1F2937" />
                </Pressable>
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="close-circle-outline" size={24} color="#98A2B3" />
                </Pressable>
              </View>
              <Text style={styles.modalTitle}>Write a Review for our Department</Text>
              <Text style={styles.modalSubtitle}>Tell us about your experience with our medical teams. Your insights help us provide even better care!</Text>
              <TextInput multiline style={styles.modalInput} placeholder="Write here...." placeholderTextColor="#98A2B3" />
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <View key={star} style={styles.starItem}>
                    <Ionicons name="star-outline" size={36} color="#D0D5DD" />
                    <Text style={styles.starLabel}>{star}</Text>
                  </View>
                ))}
              </View>
              <Pressable style={styles.modalPrimary} onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.modalPrimaryText}>Submit Review</Text>
              </Pressable>
              <Pressable style={styles.modalSecondary} onPress={() => router.back()}>
                <Text style={styles.modalSecondaryText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  screen: { flex: 1, backgroundColor: '#F7F9FC' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, backgroundColor: '#FFFFFF' },
  headerTextWrap: { flex: 1, marginLeft: 12 },
  headerTitle: { color: '#202531', fontSize: 16, fontWeight: '700' },
  headerSubtitle: { color: '#8A98B3', fontSize: 13, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 26 },
  bubbleWrap: { marginBottom: 18, maxWidth: '92%' },
  bubbleRight: { alignSelf: 'flex-end', width: '52%' },
  formCard: { width: 230, height: 150, borderRadius: 8, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  formCardBlurred: { opacity: 0.55 },
  formTitle: { color: '#202531', fontSize: 26, fontWeight: '700' },
  formTitleBlurred: { opacity: 0.6 },
  caseText: { color: '#3F4B5D', fontSize: 15, lineHeight: 30, marginBottom: 12 },
  alertStrip: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: '#FEEEEE', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 14 },
  alertText: { color: '#D92D20', fontSize: 11, maxWidth: 240 },
  primaryWideButton: { minHeight: 50, borderRadius: 4, backgroundColor: '#0F4CBA', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  primaryWideButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  footerNote: { color: '#667085', fontSize: 14, marginTop: 8, alignSelf: 'flex-end' },
  footerNoteRight: { alignSelf: 'flex-start' },
  actionRow: { flexDirection: 'row', gap: 16 },
  acceptButton: { flex: 1, minHeight: 44, borderRadius: 4, backgroundColor: '#0F4CBA', alignItems: 'center', justifyContent: 'center' },
  acceptButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  declineButton: { flex: 1, minHeight: 44, borderRadius: 4, backgroundColor: '#DCE8FB', alignItems: 'center', justifyContent: 'center' },
  declineButtonText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
  noteCard: { backgroundColor: '#DCE8FB', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 10 },
  noteTitle: { color: '#475467', fontSize: 12, marginBottom: 8 },
  noteLink: { color: '#155EEF', fontSize: 12 },
  inlineFooter: { color: '#667085', fontSize: 14, marginTop: -6 },
  threadRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14 },
  threadRowRight: { justifyContent: 'flex-end' },
  threadBubble: { maxWidth: '70%', backgroundColor: '#EEF4FF', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8 },
  threadBubbleRight: { backgroundColor: '#E8F1FF' },
  threadMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  threadAuthor: { color: '#667085', fontSize: 11 },
  threadRole: { color: '#98A2B3', fontSize: 11 },
  threadText: { color: '#202531', fontSize: 15, lineHeight: 24 },
  threadTime: { color: '#98A2B3', fontSize: 11, alignSelf: 'flex-end', marginTop: 8 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5EAF2', paddingHorizontal: 20, paddingVertical: 10 },
  inputWrap: { flex: 1, borderWidth: 1, borderColor: '#2563EB', borderRadius: 8, minHeight: 40, justifyContent: 'center', paddingHorizontal: 12 },
  input: { color: '#202531' },
  sendButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#0F4CBA', alignItems: 'center', justifyContent: 'center' },
  menuPopup: { position: 'absolute', top: 68, right: 34, backgroundColor: '#FFFFFF', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18, shadowColor: '#101828', shadowOpacity: 0.14, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24, elevation: 8, zIndex: 5 },
  menuItem: { color: '#202531', fontSize: 16, paddingVertical: 10 },
  modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.58)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: '#202531', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  modalSubtitle: { color: '#667085', fontSize: 15, lineHeight: 24, marginBottom: 18 },
  modalInput: { minHeight: 110, borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, textAlignVertical: 'top', fontSize: 16, color: '#202531', marginBottom: 20 },
  modalPrimary: { minHeight: 46, borderRadius: 4, backgroundColor: '#0F4CBA', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  modalPrimaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  modalSecondary: { minHeight: 46, borderRadius: 4, backgroundColor: '#DCE8FB', alignItems: 'center', justifyContent: 'center' },
  modalSecondaryText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
  starsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  starItem: { alignItems: 'center', gap: 6 },
  starLabel: { color: '#667085', fontSize: 13 },
});
