import React from 'react';
import { useRouter } from 'expo-router';
import { EmergencyFrame, MapCanvas, ReviewModal } from './shared';

export default function EmergencyReviewScreen() {
  const router = useRouter();

  return (
    <EmergencyFrame style={{ backgroundColor: '#ECEBE9' }}>
      <MapCanvas
        showRoute
        routeVariant="to-hospital"
        showAmbulance
        ambulanceStyle={{ right: 14, top: '10%', transform: [{ rotate: '94deg' }] }}
        overlayOpacity={0.12}
      />
      <ReviewModal onBack={() => router.back()} onSubmit={() => router.replace('/onboarding')} onCancel={() => router.back()} />
    </EmergencyFrame>
  );
}
