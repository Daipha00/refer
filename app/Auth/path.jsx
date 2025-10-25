import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import man from "../../assets/instant-information/man.png";
import Character from "../../assets/medicine/Character.png";
import Button from "../../components/Button";

const Register = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleNext = () => {
    if (selected) {
      router.push("/Auth/register");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.headerText}>
            Select your category to continue:
          </Text>

          {/* Medical card */}
          <TouchableOpacity
            style={[styles.card, selected === "medical" && styles.cardSelected]}
            onPress={() => setSelected("medical")}
          >
            <Image source={Character} style={styles.illustration} />
            <Text style={styles.title}>Medical Practitioners</Text>
            <Text style={styles.subtitle}>(Doctors, Nutritionist etc)</Text>
            <View style={styles.radioWrapper}>
              <Ionicons
                name={
                  selected === "medical"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={selected === "medical" ? "#0148B3" : "#9ca3af"}
              />
            </View>
          </TouchableOpacity>

          {/* Non-Medical card */}
          <TouchableOpacity
            style={[
              styles.card,
              selected === "nonmedical" && styles.cardSelected,
            ]}
            onPress={() => setSelected("nonmedical")}
          >
            <Image source={man} style={styles.illustration} />
            <Text style={styles.title}>Non-Medical</Text>
            <Text style={styles.subtitle}>(Care Seekers)</Text>
            <View style={styles.radioWrapper}>
              <Ionicons
                name={
                  selected === "nonmedical"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={selected === "nonmedical" ? "#0148B3" : "#9ca3af"}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Sticky Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selected && styles.nextButtonDisabled, // Disable style
            ]}
            onPress={handleNext}
            disabled={!selected} // Button disabled if no option selected
          >
            <Text
              style={[
                styles.nextButtonText,
                !selected && styles.nextButtonTextDisabled,
              ]}
            >
              Next
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color={selected ? "#fff" : "#ccc"}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    color: "#1C1F24",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  cardSelected: {
    borderColor: "#0148B3",
    borderWidth: 2,
  },
  illustration: {
    width: 100,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  radioWrapper: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#F9FAFB",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0148B3",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
  },
  nextButtonDisabled: {
    backgroundColor: "#cbd5e1", // gray when disabled
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  nextButtonTextDisabled: {
    color: "#9ca3af",
  },
});
