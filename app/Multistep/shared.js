import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const STEP_CONFIG = [
  {
    key: 'refferal',
    shortLabel: '1. Referring Details',
    route: '/Multistep/refferal',
  },
  {
    key: 'detail',
    shortLabel: '2. Patient Detail',
    route: '/Multistep/detail',
  },
  {
    key: 'review',
    shortLabel: '3. Review',
    route: '/Multistep/review',
  },
];

export function MultistepScreen({
  children,
  currentStep,
  onBack,
  scroll = true,
  contentContainerStyle,
  footer,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const content = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.scrollContent, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />

      <View style={styles.page}>
        <View style={[styles.topRow, { paddingTop: insets.top + 10 }]}>
          <Pressable
            onPress={() => {
              if (onBack) {
                onBack();
                return;
              }
              if (router.canGoBack()) {
                router.back();
              }
            }}
            hitSlop={12}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#1F2937" />
          </Pressable>
        </View>

        <View style={styles.stepRow}>
          {STEP_CONFIG.map((step, index) => {
            const active = step.key === currentStep;
            const completed = STEP_CONFIG.findIndex((item) => item.key === currentStep) > index;

            return (
              <Pressable
                key={step.key}
                onPress={() => router.push(step.route)}
                style={styles.stepItem}
              >
                <View
                  style={[
                    styles.stepLine,
                    completed && styles.stepLineCompleted,
                    active && styles.stepLineActive,
                  ]}
                />
                <Text
                  style={[
                    styles.stepLabel,
                    completed && styles.stepLabelCompleted,
                    active && styles.stepLabelActive,
                  ]}
                >
                  {step.shortLabel}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.content}>{content}</View>
      </View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

export function SectionCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function PrimaryButton({ label, onPress, icon, style, textStyle, secondary = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.primaryButton, secondary && styles.secondaryButton, style]}
    >
      <Text style={[styles.primaryButtonText, secondary && styles.secondaryButtonText, textStyle]}>
        {label}
      </Text>
      {icon}
    </Pressable>
  );
}

export function FieldLabel({ children, style }) {
  return <Text style={[styles.fieldLabel, style]}>{children}</Text>;
}

export function FieldBox({ children, style }) {
  return <View style={[styles.fieldBox, style]}>{children}</View>;
}

export function DetailRow({ label, value, valueStyle, divider = false, children }) {
  return (
    <View style={[styles.detailRow, divider && styles.detailRowDivider]}>
      <View style={styles.detailLabelWrap}>
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <View style={styles.detailValueWrap}>
        {children ?? <Text style={[styles.detailValue, valueStyle]}>{value}</Text>}
      </View>
    </View>
  );
}

export const sharedStyles = StyleSheet.create({
  mutedText: {
    color: '#7C8AA5',
    fontSize: 14,
    lineHeight: 20,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDF2FF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: '#2454D3',
    fontSize: 13,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  page: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  backButton: {
    width: 28,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepItem: {
    flex: 1,
  },
  stepLine: {
    height: 2,
    borderRadius: 999,
    backgroundColor: '#43516A',
    marginBottom: 8,
  },
  stepLineCompleted: {
    backgroundColor: '#0F8A44',
  },
  stepLineActive: {
    backgroundColor: '#2563EB',
  },
  stepLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  stepLabelCompleted: {
    color: '#0F8A44',
  },
  stepLabelActive: {
    color: '#2563EB',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#E6EAF2',
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6EAF2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#222B45',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#0F4CBA',
    minHeight: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#DCE8FB',
  },
  secondaryButtonText: {
    color: '#0F4CBA',
  },
  fieldLabel: {
    color: '#55637D',
    fontSize: 14,
    marginBottom: 8,
  },
  fieldBox: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: '#275DFF',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 14,
  },
  detailRowDivider: {
    borderTopWidth: 1,
    borderTopColor: '#E5EAF3',
    marginTop: 6,
    paddingTop: 16,
  },
  detailLabelWrap: {
    flex: 0.45,
  },
  detailValueWrap: {
    flex: 0.55,
  },
  detailLabel: {
    color: '#8A98B3',
    fontSize: 14,
    lineHeight: 20,
  },
  detailValue: {
    color: '#222222',
    fontSize: 16,
    lineHeight: 24,
  },
});
