import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const chats = [
  {
    id: 'cardio',
    title: 'Cardiology',
    hospital: 'Mulago National Referral Hospital',
    message: 'Congenital Pyloric Stenosis from Soroti Regio...',
    time: '10:32 AM',
    urgent: true,
    unread: true,
    icon: 'heart-outline',
  },
  {
    id: 'ent',
    title: 'Ear, Nose and Throat',
    hospital: 'Mulago National Referral Hospital',
    message: "Patient's ECG shows normal sinus rhythm. Will continue...",
    time: '10:15 AM',
    icon: 'medical-outline',
  },
];

export default function ReferralChatScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
          <Text style={styles.title}>Referral</Text>
          <Pressable style={styles.addButton} onPress={() => router.push('/Multistep/refferal')}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        <Pressable onPress={() => router.push('/search')} style={styles.searchBar}>
          <View style={styles.searchLeft}>
            <Feather name="search" size={18} color="#748196" />
            <Text style={styles.searchText}>Search departments, hospitals or message</Text>
          </View>
        </Pressable>

        <View style={styles.chatList}>
          {chats.map((chat) => (
            <Pressable key={chat.id} style={styles.chatCard}>
              <View style={styles.chatIcon}>
                <Ionicons name={chat.icon as 'heart-outline' | 'medical-outline'} size={24} color="#3B82F6" />
              </View>
              <View style={styles.chatMain}>
                <View style={styles.chatTop}>
                  <Text style={styles.chatTitle}>{chat.title}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.chatHospital}>{chat.hospital}</Text>
                <View style={styles.chatBottom}>
                  {chat.urgent ? (
                    <View style={styles.urgentBadge}>
                      <Text style={styles.urgentText}>Urgent</Text>
                    </View>
                  ) : null}
                  <Text style={styles.chatMessage}>{chat.message}</Text>
                  {chat.unread ? <View style={styles.unreadDot} /> : <Feather name="check" size={14} color="#6B7280" />}
                </View>
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
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    marginLeft: 14,
    color: '#202531',
    fontSize: 17,
    fontWeight: '700',
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: '#0F4CBA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    minHeight: 46,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D3DBE6',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 18,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchText: {
    color: '#8A98B3',
    fontSize: 14,
  },
  chatList: {
    marginHorizontal: -20,
  },
  chatCard: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF2',
    gap: 12,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  chatMain: {
    flex: 1,
  },
  chatTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatTitle: {
    color: '#202531',
    fontSize: 16,
    fontWeight: '700',
  },
  chatTime: {
    color: '#6B7280',
    fontSize: 12,
  },
  chatHospital: {
    color: '#8A98B3',
    fontSize: 13,
    marginBottom: 6,
  },
  chatBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgentBadge: {
    backgroundColor: '#FEE4E2',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  urgentText: {
    color: '#D92D20',
    fontSize: 11,
  },
  chatMessage: {
    flex: 1,
    color: '#202531',
    fontSize: 13,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
});
