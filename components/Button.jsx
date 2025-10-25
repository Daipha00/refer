import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

const Button = ({ disabled, onpress }) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          !disabled && { backgroundColor: "#9ca3af" }, // disabled look
        ]}
        disabled={!disabled}
        onPress={onpress}
      >
        <Text style={styles.buttonText}>Next</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="white"
          style={{ marginLeft: 6, marginTop: 3 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Button

















const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0148B3",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
