import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getSlides from '../../components/Slides';

const { width } = Dimensions.get('window');
const slides = getSlides();

export default function OnboardingScreen() {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const renderItem = ({ item }) => {
    const titleParts = item.title.split(item.titleHighlight);
    
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => {
            router.replace('../Emergency');
          }}
        >
          <Text style={styles.emergencyButtonText}>Emergency Help?</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {titleParts[0]}
            <Text style={styles.highlight}> {item.titleHighlight} </Text>
            {titleParts[1]}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderStepIndicators = () => {
    return (
      <View style={styles.stepContainer}>
        {slides.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.stepIndicator,
              index === currentIndex && styles.activeStepIndicator,
            ]} 
          />
        ))}
      </View>
    );
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      router.replace('/Auth/path'); // 🔹 Changed from /Auth/register to /Auth/path
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    router.replace('/Auth/path'); // 🔹 Changed from /Auth/register to /Auth/path
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.footer}>
        {renderStepIndicators()}
        <View style={[styles.buttonContainer, { justifyContent: currentIndex === slides.length - 1 ? 'center' : 'space-between' }]}>
          {currentIndex === slides.length - 1 ? (
            <TouchableOpacity 
              style={styles.getStartedButton} 
              onPress={handleSkip}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.skipButton} 
                onPress={handleSkip}
              >
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.nextButton} 
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <Ionicons name="chevron-forward" size={16} color="white" style={{ marginLeft: 5 }} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  emergencyButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 235, 235, 1)',
    backgroundColor: 'rgba(255, 235, 235, 1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 10, 
    elevation: 5,
  },
  emergencyButtonText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    lineHeight: 36,
  },
  highlight: {
    color: '#3484FD',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeStepIndicator: {
    width: 24,
    backgroundColor: '#3484FD',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 72, 179, 1)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    minWidth: 150,
  },
  skipButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 72, 179, 1)',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '70%',
    elevation: 3,
  },
  getStartedText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  buttonText: {
    padding: 20,
    width: '100%',
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});
