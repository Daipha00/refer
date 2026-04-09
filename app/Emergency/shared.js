import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

const ambulanceImage = require('../../assets/images/umboardimg/Ambulance.png');

export function EmergencyFrame({ children, style }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.screen, style]}>{children}</View>
    </SafeAreaView>
  );
}

export function TopBackRow({ onBack, badge = 'Emergency Help?' }) {
  return (
    <View style={styles.topBackRow}>
      <Pressable onPress={onBack} hitSlop={10}>
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </Pressable>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export function EmergencyTypeChips() {
  const items = [
    { label: 'Medical', color: '#DDE879', icon: <MaterialCommunityIcons name="medical-bag" size={16} color="#2F3A20" /> },
    { label: 'Fire', color: '#FFB3B0', icon: <MaterialCommunityIcons name="fire" size={16} color="#2F3A20" /> },
    { label: 'Natural Disaster', color: '#9FF0D6', icon: <MaterialCommunityIcons name="office-building-marker-outline" size={16} color="#2F3A20" /> },
    { label: 'Accident', color: '#D8D0FF', icon: <MaterialCommunityIcons name="car-multiple" size={16} color="#2F3A20" /> },
    { label: 'Violence', color: '#F2A5DE', icon: <MaterialCommunityIcons name="knife" size={16} color="#2F3A20" /> },
    { label: 'Rescue', color: '#F6E28B', icon: <MaterialCommunityIcons name="lifebuoy" size={16} color="#2F3A20" /> },
    { label: 'Others', color: '#B2C2FF', icon: <MaterialCommunityIcons name="dots-grid" size={16} color="#2F3A20" /> },
  ];

  return (
    <View style={styles.chipsWrap}>
      {items.map((item) => (
        <View key={item.label} style={styles.chip}>
          <View style={[styles.chipIconWrap, { backgroundColor: item.color }]}>{item.icon}</View>
          <Text style={styles.chipText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function PanicButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.panicOuter}>
      <View style={styles.panicMiddle}>
        <View style={styles.panicInner}>
          <MaterialCommunityIcons name="gesture-tap-hold" size={38} color="#FFFFFF" />
          <Text style={styles.panicLabel}>Press and hold for 3 secs</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function LocationFooter() {
  return (
    <View style={styles.locationFooter}>
      <Text style={styles.locationCaption}>Your Current Location is:</Text>
      <Text style={styles.locationValue}>No 55, Ketu Rd, Lagos State, Nigeria</Text>
    </View>
  );
}

function MapRoad({ x, y, w, rotate }) {
  return <View style={[styles.road, { left: x, top: y, width: w, transform: [{ rotate: `${rotate}deg` }] }]} />;
}

function Route({ variant }) {
  const segments =
    variant === 'to-hospital'
      ? [
          { left: '71%', top: '12%', width: 120, rotate: 61 },
          { left: '59%', top: '26%', width: 110, rotate: 148 },
          { left: '70%', top: '42%', width: 122, rotate: 70 },
          { left: '58%', top: '58%', width: 130, rotate: 146 },
          { left: '67%', top: '75%', width: 88, rotate: 80 },
        ]
      : [
          { left: '11%', top: '58%', width: 170, rotate: 30 },
          { left: '43%', top: '48%', width: 120, rotate: 150 },
          { left: '65%', top: '57%', width: 145, rotate: 70 },
        ];

  return (
    <>
      {segments.map((seg, index) => (
        <View
          key={index}
          style={[
            styles.routeSegment,
            { left: seg.left, top: seg.top, width: seg.width, transform: [{ rotate: `${seg.rotate}deg` }] },
          ]}
        />
      ))}
      <View style={[styles.routeStartDot, variant === 'to-hospital' ? { left: '73%', top: '82%' } : { left: '13%', top: '61%' }]} />
    </>
  );
}

function PulseMarker() {
  return (
    <View style={styles.pulseWrap}>
      <View style={styles.pulseOuter} />
      <View style={styles.pulseMid} />
      <View style={styles.pulseInner}>
        <Ionicons name="location-sharp" size={18} color="#2F2F2F" />
      </View>
    </View>
  );
}

function SmallMarker({ style }) {
  return (
    <View style={[styles.smallMarker, style]}>
      <Ionicons name="location-outline" size={14} color="#2563EB" />
    </View>
  );
}

export function MapCanvas({
  showRoute = false,
  routeVariant = 'to-user',
  showPulse = true,
  showMarkers = false,
  showAmbulance = false,
  ambulanceStyle,
  topBubble,
  topCard,
  overlayOpacity = 0,
  children,
}) {
  return (
    <View style={styles.mapCanvas}>
      <View style={styles.mapBackground}>
        <MapRoad x={-20} y={40} w={180} rotate={72} />
        <MapRoad x={90} y={-30} w={240} rotate={118} />
        <MapRoad x={205} y={20} w={210} rotate={44} />
        <MapRoad x={-30} y={210} w={280} rotate={145} />
        <MapRoad x={160} y={230} w={180} rotate={102} />
        <MapRoad x={-10} y={360} w={240} rotate={92} />
        <MapRoad x={190} y={355} w={240} rotate={126} />
        <MapRoad x={60} y={500} w={220} rotate={10} />
        <MapRoad x={230} y={520} w={120} rotate={84} />
      </View>
      {showRoute ? <Route variant={routeVariant} /> : null}
      {showMarkers ? (
        <>
          <SmallMarker style={{ left: '69%', top: '36%' }} />
          <SmallMarker style={{ left: '75%', top: '42%' }} />
          <SmallMarker style={{ left: '78%', top: '31%' }} />
        </>
      ) : null}
      {showPulse ? <PulseMarker /> : null}
      {showAmbulance ? <Image source={ambulanceImage} resizeMode="contain" style={[styles.ambulance, ambulanceStyle]} /> : null}
      {topBubble ? <View style={styles.topBubbleWrap}>{topBubble}</View> : null}
      {topCard ? <View style={styles.topCardWrap}>{topCard}</View> : null}
      {children}
      {overlayOpacity ? <View pointerEvents="none" style={[styles.mapOverlay, { backgroundColor: `rgba(0,0,0,${overlayOpacity})` }]} /> : null}
    </View>
  );
}

export function StatusBanner({ text, time = '00:00', color = '#3B82F6' }) {
  return (
    <View style={[styles.statusBanner, { backgroundColor: color }]}>
      <View style={styles.statusBannerLeft}>
        <MaterialCommunityIcons name="ambulance" size={18} color="#FFFFFF" />
        <Text style={styles.statusBannerText}>{text}</Text>
      </View>
      <View style={styles.statusTime}>
        <Text style={styles.statusTimeText}>{time}</Text>
      </View>
    </View>
  );
}

export function JourneySheet({ title = 'En route to:', buttonLabel = 'Track Journey', onPrimary, onSecondary, secondaryLabel = 'Finish', success = false }) {
  return (
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <Text style={styles.sheetCaption}>{title}</Text>
      <View style={styles.destinationRow}>
        <Text style={styles.destinationTitle}>Uganda Cancer Institute{'\n'}National Referral Hospital</Text>
        <Text style={styles.distanceText}>(45 km away)</Text>
      </View>
      <Text style={styles.destinationLink}>Plot 14, Old Kampala Road, Kam...</Text>
      <Pressable style={styles.primaryGhostButton} onPress={onPrimary}>
        <Text style={styles.primaryGhostText}>{buttonLabel}</Text>
      </Pressable>
      <Pressable style={[styles.secondaryGhostButton, success && styles.secondaryGhostButtonDisabled]} onPress={onSecondary}>
        <Text style={styles.secondaryGhostText}>{secondaryLabel}</Text>
      </Pressable>
    </View>
  );
}

export function AddressCard({ destination = 'General Hospital Isale', subtitle = 'Looking for nearby ambulances...' }) {
  return (
    <View style={styles.addressCard}>
      <View style={styles.addressRow}>
        <View style={styles.addressMarker} />
        <Text style={styles.addressTitle}>10th of abimbola Street</Text>
      </View>
      <View style={styles.addressTrack}>
        <View style={styles.trackLine} />
        <View style={styles.trackDot} />
      </View>
      <View style={styles.addressRowBottom}>
        <Ionicons name="location-outline" size={16} color="#3B82F6" />
        <Text style={[styles.addressSubtitle, subtitle === 'Looking for nearby ambulances...' && styles.addressSubtitleMuted]}>
          {subtitle === 'Looking for nearby ambulances...' ? subtitle : destination}
        </Text>
      </View>
    </View>
  );
}

export function AlertPill({ text, highlight, icon = 'bell' }) {
  const parts = highlight ? text.split(highlight) : [text];
  return (
    <View style={styles.alertPill}>
      <MaterialCommunityIcons name={icon} size={20} color="#FF5B18" />
      <Text style={styles.alertPillText}>
        {parts[0]}
        {highlight ? <Text style={styles.alertHighlight}>{highlight}</Text> : null}
        {highlight ? parts[1] : null}
      </Text>
    </View>
  );
}

export function SoftAction({ text, danger = false, icon = 'close', onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.softAction, danger ? styles.softActionDanger : styles.softActionPrimary]}>
      {icon === 'play-circle-outline' ? (
        <Ionicons name="play-circle-outline" size={18} color={danger ? '#B42318' : '#0F4CBA'} />
      ) : (
        <Feather name="x" size={18} color={danger ? '#B42318' : '#0F4CBA'} />
      )}
      <Text style={[styles.softActionText, danger ? styles.softActionDangerText : styles.softActionPrimaryText]}>{text}</Text>
    </Pressable>
  );
}

export function AmbulanceListSheet({ onPrimary, onBack }) {
  const rows = [
    { id: '1', code: 'UHI-AMB-001', hospital: 'Uganda Heart Institute Natio...', grade: 'A', rating: '4.5', minutes: '5 mins' },
    { id: '2', code: 'KRG-AMB-010', hospital: 'Kagando Referral General Hos...', grade: 'B', rating: '5.0', minutes: '10 mins' },
    { id: '3', code: 'MGH-AMB-03', hospital: 'Mulango General Hospital', grade: 'C', rating: '3.9', minutes: '10 mins' },
  ];

  return (
    <View style={styles.sheetLarge}>
      <View style={styles.handle} />
      <Text style={styles.sheetLargeTitle}>Choose an Ambulance</Text>
      {rows.map((row) => (
        <View key={row.id} style={styles.ambulanceRow}>
          <Ionicons name="person-circle-outline" size={52} color="#9AA5B5" />
          <View style={styles.ambulanceMiddle}>
            <Text style={styles.ambulanceCode}>{row.code}</Text>
            <Text style={styles.ambulanceHospital}>{row.hospital}</Text>
            <View style={styles.ambulanceMeta}>
              <Text style={styles.metaLabel}>Grade</Text>
              <View style={[styles.gradeBadge, row.grade === 'A' ? styles.gradeA : row.grade === 'B' ? styles.gradeB : styles.gradeC]}>
                <Text style={styles.gradeText}>{row.grade}</Text>
              </View>
              <Ionicons name="information-circle" size={14} color="#98A2B3" />
              <AntDesign name="star" size={13} color="#D4A600" />
              <Text style={styles.metaLabel}>{row.rating}</Text>
            </View>
          </View>
          <Text style={styles.etaText}>{row.minutes}</Text>
        </View>
      ))}
      <View style={styles.sheetDivider} />
      <Pressable style={styles.primaryActionButton} onPress={onPrimary}>
        <Feather name="phone" size={18} color="#FFFFFF" />
        <Text style={styles.primaryActionButtonText}>Call Selected Ambulance Driver</Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={18} color="#667085" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

export function DriverSheet({ onChange, onCall, onCancel }) {
  return (
    <View style={styles.sheetLarge}>
      <View style={styles.handle} />
      <View style={[styles.ambulanceRow, styles.driverRowCard]}>
        <Ionicons name="person-circle-outline" size={56} color="#9AA5B5" />
        <View style={styles.ambulanceMiddle}>
          <Text style={styles.ambulanceCode}>UHI-AMB-001</Text>
          <Text style={styles.ambulanceHospital}>Uganda Heart Institute Natio...</Text>
          <View style={styles.ambulanceMeta}>
            <Text style={styles.metaLabel}>Grade</Text>
            <View style={[styles.gradeBadge, styles.gradeA]}>
              <Text style={styles.gradeText}>A</Text>
            </View>
            <Ionicons name="information-circle" size={14} color="#98A2B3" />
            <AntDesign name="star" size={13} color="#D4A600" />
            <Text style={styles.metaLabel}>4.5</Text>
          </View>
        </View>
        <Text style={styles.etaText}>5 mins</Text>
      </View>
      <View style={styles.driverActions}>
        <CircleAction icon="hospital-box-outline" label="Change Hospital" color="#B26900" onPress={onChange} />
        <CircleAction icon="phone-outline" label="Call Driver" color="#15803D" onPress={onCall} />
        <CircleAction icon="close" label="Cancel Ride" color="#B42318" onPress={onCancel} />
      </View>
    </View>
  );
}

function CircleAction({ icon, label, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.circleActionWrap}>
      <View style={styles.circleAction}>
        <Ionicons name={icon} size={26} color="#667085" />
      </View>
      <Text style={[styles.circleActionLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function ReviewModal({ onBack, onSubmit, onCancel }) {
  return (
    <View style={styles.reviewOverlay}>
      <View style={styles.reviewSheet}>
        <View style={styles.reviewHeader}>
          <Pressable onPress={onBack}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </Pressable>
          <Pressable onPress={onCancel}>
            <Ionicons name="close-circle-outline" size={24} color="#98A2B3" />
          </Pressable>
        </View>
        <Text style={styles.reviewTitle}>Share Your Ambulance Review</Text>
        <Text style={styles.reviewSubtitle}>Help us improve by sharing your thoughts on the ambulance service</Text>
        <TextInput multiline placeholder="Write here...." placeholderTextColor="#98A2B3" style={styles.reviewInput} />
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <View key={star} style={styles.starWrap}>
              <AntDesign name="star" size={36} color="#D0D5DD" />
              <Text style={styles.starLabel}>{star}</Text>
            </View>
          ))}
        </View>
        <Pressable style={styles.submitReviewButton} onPress={onSubmit}>
          <Text style={styles.submitReviewText}>Submit Review</Text>
        </Pressable>
        <Pressable style={styles.cancelReviewButton} onPress={onCancel}>
          <Text style={styles.cancelReviewText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6F8FC' },
  screen: { flex: 1, backgroundColor: '#F6F8FC' },
  topBackRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 12 },
  badge: { backgroundColor: '#FFE9E7', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 10 },
  badgeText: { color: '#F04438', fontSize: 15, fontWeight: '500' },
  headerSpacer: { width: 24 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 18 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E3E8F0', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 10 },
  chipIconWrap: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  chipText: { color: '#4B5563', fontSize: 14 },
  panicOuter: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#FFD1D1', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 30 },
  panicMiddle: { width: 178, height: 178, borderRadius: 89, backgroundColor: '#FFA1A1', alignItems: 'center', justifyContent: 'center' },
  panicInner: { width: 132, height: 132, borderRadius: 66, backgroundColor: '#E32626', borderWidth: 4, borderColor: '#D71818', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  panicLabel: { color: '#FFFFFF', fontSize: 12, textAlign: 'center', marginTop: 8 },
  locationFooter: { backgroundColor: '#E8EDF5', paddingVertical: 16, alignItems: 'center' },
  locationCaption: { color: '#667085', fontSize: 14, marginBottom: 8 },
  locationValue: { color: '#155EEF', fontSize: 16 },
  mapCanvas: { flex: 1, overflow: 'hidden', backgroundColor: '#EDEDED' },
  mapBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: '#ECEBE9' },
  road: { position: 'absolute', height: 12, backgroundColor: '#FAFAFA', borderRadius: 999, opacity: 0.9 },
  routeSegment: { position: 'absolute', height: 5, borderRadius: 999, backgroundColor: '#8FB9FF' },
  routeStartDot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#155EEF' },
  pulseWrap: { position: 'absolute', left: '36%', top: '40%', width: 116, height: 116, alignItems: 'center', justifyContent: 'center' },
  pulseOuter: { position: 'absolute', width: 116, height: 116, borderRadius: 58, backgroundColor: 'rgba(255, 84, 84, 0.15)' },
  pulseMid: { position: 'absolute', width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255, 84, 84, 0.22)' },
  pulseInner: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255, 84, 84, 0.9)', alignItems: 'center', justifyContent: 'center' },
  smallMarker: { position: 'absolute', width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D0D5DD' },
  ambulance: { position: 'absolute', width: 54, height: 54 },
  topBubbleWrap: { position: 'absolute', top: 58, left: 20, right: 20 },
  topCardWrap: { position: 'absolute', top: 68, left: 20, right: 20 },
  mapOverlay: { ...StyleSheet.absoluteFillObject },
  statusBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  statusBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  statusBannerText: { color: '#FFFFFF', fontSize: 15 },
  statusTime: { backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  statusTimeText: { color: '#344054', fontSize: 13 },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 26 },
  handle: { alignSelf: 'center', width: 62, height: 5, borderRadius: 999, backgroundColor: '#D5D9E0', marginBottom: 24 },
  sheetCaption: { color: '#667085', fontSize: 16, fontStyle: 'italic', marginBottom: 14 },
  destinationRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  destinationTitle: { flex: 1, color: '#1F2937', fontSize: 17, fontWeight: '700', lineHeight: 28 },
  distanceText: { color: '#98A2B3', fontSize: 16, marginTop: 4 },
  destinationLink: { color: '#155EEF', fontSize: 16, marginTop: 12, marginBottom: 20 },
  primaryGhostButton: { backgroundColor: '#DCE8FB', borderRadius: 4, minHeight: 44, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  primaryGhostText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
  secondaryGhostButton: { borderWidth: 1, borderColor: '#E4E7EC', borderRadius: 4, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  secondaryGhostButtonDisabled: { backgroundColor: '#FCFCFD' },
  secondaryGhostText: { color: '#667085', fontSize: 16 },
  addressCard: { backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 22, paddingVertical: 18, shadowColor: '#101828', shadowOpacity: 0.07, shadowOffset: { width: 0, height: 6 }, shadowRadius: 16, elevation: 4 },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  addressMarker: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#155EEF', borderWidth: 3, borderColor: '#E6F0FF' },
  addressTitle: { color: '#155EEF', fontSize: 17, fontWeight: '500' },
  addressTrack: { marginLeft: 8, marginTop: 6, marginBottom: 6, height: 28, width: 2, backgroundColor: '#D0D5DD' },
  trackLine: { flex: 1 },
  trackDot: { position: 'absolute', bottom: -4, left: -6, width: 14, height: 14, borderRadius: 7, backgroundColor: '#98A2B3' },
  addressRowBottom: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addressSubtitle: { color: '#155EEF', fontSize: 15 },
  addressSubtitleMuted: { color: '#98A2B3' },
  alertPill: { backgroundColor: '#FFFFFF', borderRadius: 999, minHeight: 42, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, alignSelf: 'flex-start', shadowColor: '#101828', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 3 },
  alertPillText: { color: '#475467', fontSize: 15 },
  alertHighlight: { color: '#FF5B18' },
  softAction: { minHeight: 48, borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 14 },
  softActionPrimary: { backgroundColor: '#DCE8FB' },
  softActionDanger: { backgroundColor: '#FEE4E2' },
  softActionText: { fontSize: 16, fontWeight: '500' },
  softActionPrimaryText: { color: '#0F4CBA' },
  softActionDangerText: { color: '#B42318' },
  sheetLarge: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 },
  sheetLargeTitle: { color: '#475467', fontSize: 18, fontWeight: '700', marginBottom: 18 },
  ambulanceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#D7DFEA', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 12, marginBottom: 8, backgroundColor: '#FFFFFF' },
  driverRowCard: { backgroundColor: '#EAF2FF', borderColor: '#155EEF', marginBottom: 20 },
  ambulanceMiddle: { flex: 1 },
  ambulanceCode: { color: '#1F2937', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  ambulanceHospital: { color: '#667085', fontSize: 14, marginBottom: 8 },
  ambulanceMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaLabel: { color: '#344054', fontSize: 14 },
  gradeBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  gradeA: { backgroundColor: '#FFD5D2' },
  gradeB: { backgroundColor: '#FFF3BF' },
  gradeC: { backgroundColor: '#D1FADF' },
  gradeText: { color: '#344054', fontSize: 13 },
  etaText: { color: '#667085', fontSize: 14, fontStyle: 'italic' },
  sheetDivider: { borderTopWidth: 1, borderTopColor: '#EAECF0', marginVertical: 16 },
  primaryActionButton: { minHeight: 46, backgroundColor: '#0F4CBA', borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginBottom: 14 },
  primaryActionButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  backButton: { minHeight: 46, backgroundColor: '#F9FAFB', borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  backButtonText: { color: '#667085', fontSize: 16 },
  driverActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  circleActionWrap: { flex: 1, alignItems: 'center' },
  circleAction: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4E7EC', alignItems: 'center', justifyContent: 'center', marginBottom: 10, shadowColor: '#101828', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 3 }, shadowRadius: 8, elevation: 2 },
  circleActionLabel: { textAlign: 'center', fontSize: 13 },
  reviewOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(255,255,255,0.55)' },
  reviewSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 30 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  reviewTitle: { color: '#1F2937', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  reviewSubtitle: { color: '#667085', fontSize: 15, lineHeight: 24, marginBottom: 18 },
  reviewInput: { minHeight: 110, borderWidth: 1, borderColor: '#D0D5DD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: '#1F2937', textAlignVertical: 'top', marginBottom: 18 },
  starsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  starWrap: { alignItems: 'center', gap: 6 },
  starLabel: { color: '#667085', fontSize: 13 },
  submitReviewButton: { minHeight: 46, backgroundColor: '#0F4CBA', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  submitReviewText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  cancelReviewButton: { minHeight: 46, backgroundColor: '#DCE8FB', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  cancelReviewText: { color: '#0F4CBA', fontSize: 16, fontWeight: '500' },
});
