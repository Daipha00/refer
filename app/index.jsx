import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashLogo from '../assets/images/icon.png';
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const checkOnboardingStatus = async () => {
      const hasCompleted = await AsyncStorage.getItem('onboardingComplete');
      timeoutId = setTimeout(() => {
        if (hasCompleted === 'true') {
          router.replace('/onboarding');
        } else {
          router.replace('/onboarding');
        }
      }, 3000); // 3 seconds splash screen
    };

    checkOnboardingStatus();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={SplashLogo} style={styles.logo} />
        {/* <Text style={styles.logo}> Refer Me Right</Text>
        <ActivityIndicator size="large" color="#007bff" /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 42, 106, 1)',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
});
