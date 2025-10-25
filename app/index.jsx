import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashLogo from '../assets/images/splash-icon.png';
export default function SplashScreen() {
  const router = useRouter();


  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasCompleted = await AsyncStorage.getItem('onboardingComplete');
      setTimeout(() => {
        if (hasCompleted === 'true') {
          // router.replace('/Auth/register');
          router.replace('/onboarding');
          // router.replace('/auth/login');
        } else {
          router.replace('/onboarding');
          // router.replace('/Auth/register');
          // replace this area
        }
      }, 2000); // 2 seconds splash screen
    };
    checkOnboardingStatus();
  }, []);

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
