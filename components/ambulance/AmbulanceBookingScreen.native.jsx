import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function AmbulanceBookingScreen() {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    loop.start();

    return () => loop.stop();
  }, [pulseAnim]);

  const location = {
    latitude: -6.1659,
    longitude: 39.2026,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} />
        <Circle
          center={location}
          radius={150}
          fillColor="rgba(255,0,0,0.1)"
          strokeColor="rgba(255,0,0,0.4)"
        />
      </MapView>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.pulseCircle,
          {
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 0.1],
            }),
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2],
                }),
              },
            ],
          },
        ]}
      />

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#007AFF" />
          <Text style={styles.locationText}>10th of Abimbola Street</Text>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="car-outline" size={18} color="gray" />
          <Text style={styles.statusText}>Looking for nearby ambulances...</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelButton}>
        <Ionicons name="close" size={18} color="#B71C1C" />
        <Text style={styles.cancelText}>Cancel Ambulance Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pulseCircle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 200,
    height: 200,
    marginLeft: -100,
    marginTop: -100,
    borderRadius: 100,
    backgroundColor: "rgba(255,0,0,0.2)",
  },
  infoCard: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginLeft: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 6,
    fontSize: 15,
    color: "#555",
  },
  cancelButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDECEA",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  cancelText: {
    color: "#B71C1C",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 16,
  },
});
