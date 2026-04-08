import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmptyReferralScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
          <Text style={styles.title}>Referral</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.centerContent}>
          <View style={styles.illustrationWrap}>
            <View style={styles.outerCircle}>
              <View style={styles.windowDots}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
              </View>
              <View style={styles.cardMock}>
                <View style={styles.mockLineShort} />
                <View style={styles.mockInput}>
                  <Feather name="paperclip" size={16} color="#2563EB" />
                </View>
                <View style={styles.mockLineMedium} />
                <View style={styles.mockButton} />
                <View style={styles.handWrap}>
                  <MaterialCommunityIcons name="cursor-default-click-outline" size={30} color="#2563EB" />
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.emptyTitle}>No Referral Data yet</Text>
          <Text style={styles.emptyText}>
            Start connecting patients to the care they need. Create a referral in just a few taps
          </Text>

          <Pressable style={styles.ctaButton} onPress={() => router.push('/referral')}>
            <Text style={styles.ctaText}>Refer a Patient</Text>
            <Feather name="plus" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    flex: 1,
    marginLeft: 14,
    color: '#202531',
    fontSize: 17,
    fontWeight: '700',
  },
  spacer: {
    width: 28,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  illustrationWrap: {
    marginBottom: 28,
  },
  outerCircle: {
    width: 152,
    height: 152,
    borderRadius: 76,
    backgroundColor: '#E4EEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  windowDots: {
    flexDirection: 'row',
    gap: 14,
    position: 'absolute',
    top: 26,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  dotActive: {
    backgroundColor: '#9DBAF6',
  },
  cardMock: {
    width: 92,
    height: 106,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
  },
  mockLineShort: {
    width: 32,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#D7E2F3',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  mockInput: {
    width: 76,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mockLineMedium: {
    width: 44,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#D7E2F3',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  mockButton: {
    width: 74,
    height: 18,
    borderRadius: 5,
    backgroundColor: '#AFCBFA',
  },
  handWrap: {
    position: 'absolute',
    right: 8,
    bottom: 10,
  },
  emptyTitle: {
    color: '#202531',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  emptyText: {
    color: '#5E6A7D',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    maxWidth: 290,
    marginBottom: 24,
  },
  ctaButton: {
    minWidth: 280,
    minHeight: 46,
    borderRadius: 4,
    backgroundColor: '#0F4CBA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
