import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const UserNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname || "";

  return (
    <View style={styles.navContainer}>
      {/* Register Button */}
      <TouchableOpacity
        onPress={() => router.push("/Auth/register")}
        style={[
          styles.navButton,
          path === "/Auth/register" && styles.activeButton,
        ]}
        disabled={path === "/Auth/register"}
      >
        <Text style={[styles.navText, path === "/Auth/register" && styles.activeNavText]}>Create Account</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push("/Auth/login")}
        style={[styles.navButton, path === "/Auth/login" && styles.activeButton]}
        disabled={path === "/Auth/login"}
      >
        <Text style={[styles.navText, path === "/Auth/login" && styles.activeNavText]}>Login</Text>
      </TouchableOpacity>

    </View>
  
  );
};

export default UserNav;

const styles = StyleSheet.create({
  navContainer: {
   backgroundColor:"#EEF2F6",
   borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    width:"100%",
  },
  navButton: {
    alignContent:"center",
    justifyContent:"center",
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
  },
  activeButton: {
    backgroundColor: "white",
    alignContent:"center",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "#E4E7EC",
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667085",
    textAlign:"center"
  },
  activeNavText: {
    color: "#202531",
  },
});
