import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MapsLib = Platform.OS === "web" ? null : require("react-native-maps");
const MapViewComponent = MapsLib?.default ?? View;
const MarkerComponent = MapsLib?.Marker;
const CircleComponent = MapsLib?.Circle;

function WebMapFallback({ pulseAnim }) {
  return (
    <View style={styles.webMap}>
      <View style={styles.webRoadHorizontal} />
      <View style={styles.webRoadVertical} />
      <View style={styles.webRoadDiagonalLeft} />
      <View style={styles.webRoadDiagonalRight} />

      <Animated.View
        style={[
          styles.webPulse,
          {
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.35, 0.12],
            }),
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.7],
                }),
              },
            ],
          },
        ]}
      />

      <View style={styles.markerWrap}>
        <View style={styles.markerDot}>
          <Ionicons name="location-sharp" size={18} color="#30323A" />
        </View>
      </View>
    </View>
  );
}

export default function AmbulanceBooking() {
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

    return () => {
      loop.stop();
    };
  }, [pulseAnim]);

  const location = useMemo(
    () => ({
      latitude: -6.1659,
      longitude: 39.2026,
    }),
    []
  );

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.1],
  });

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <WebMapFallback pulseAnim={pulseAnim} />
      ) : (
        <MapViewComponent
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {MarkerComponent ? <MarkerComponent coordinate={location} /> : null}
          {CircleComponent ? (
            <CircleComponent
              center={location}
              radius={150}
              fillColor="rgba(255,0,0,0.1)"
              strokeColor="rgba(255,0,0,0.4)"
            />
          ) : null}
        </MapViewComponent>
      )}

      <Animated.View
        pointerEvents="none"
        style={[
          styles.pulseCircle,
          {
            opacity,
            transform: [{ scale }],
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
        <Ionicons name="close" size={18} color="#b71c1c" />
        <Text style={styles.cancelText}>Cancel Ambulance Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webMap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ECEBE9",
    overflow: "hidden",
  },
  webRoadHorizontal: {
    position: "absolute",
    top: "26%",
    left: -30,
    right: -20,
    height: 14,
    backgroundColor: "#FAFAFA",
    transform: [{ rotate: "18deg" }],
    borderRadius: 99,
  },
  webRoadVertical: {
    position: "absolute",
    top: -10,
    bottom: -20,
    left: "58%",
    width: 14,
    backgroundColor: "#FAFAFA",
    transform: [{ rotate: "28deg" }],
    borderRadius: 99,
  },
  webRoadDiagonalLeft: {
    position: "absolute",
    top: "48%",
    left: -50,
    width: 320,
    height: 14,
    backgroundColor: "#FAFAFA",
    transform: [{ rotate: "112deg" }],
    borderRadius: 99,
  },
  webRoadDiagonalRight: {
    position: "absolute",
    top: "62%",
    right: -40,
    width: 260,
    height: 14,
    backgroundColor: "#FAFAFA",
    transform: [{ rotate: "54deg" }],
    borderRadius: 99,
  },
  webPulse: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: 180,
    height: 180,
    marginLeft: -90,
    marginTop: -90,
    borderRadius: 90,
    backgroundColor: "rgba(255,0,0,0.22)",
  },
  markerWrap: {
    position: "absolute",
    top: "40%",
    left: "50%",
    marginLeft: -18,
    marginTop: -18,
  },
  markerDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,84,84,0.86)",
    alignItems: "center",
    justifyContent: "center",
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
