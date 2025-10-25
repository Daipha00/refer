import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const UserNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState("");

  useEffect(() => {
    if (pathname) {
      setPath(pathname);
    }
  }, [pathname]);

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
        <Text style={styles.navText}>Create Account</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push("/Auth/login")}
        style={[styles.navButton, path === "/Auth/login" && styles.activeButton]}
        disabled={path === "/Auth/login"}
      >
        <Text style={styles.navText}>Login</Text>
      </TouchableOpacity>

    </View>
  
  );
};

export default UserNav;

const styles = StyleSheet.create({
  navContainer: {
   backgroundColor:"#EFF1F4",
   borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    width:"100%",
  },
  navButton: {
      display:"flex",
    alignContent:"center",
    justifyContent:"center",
    textAlign: "center",
    padding: 12,
    borderRadius: 6,
    width: 160,
  },
  activeButton: {
    backgroundColor: "white",
    display:"flex",
    alignContent:"center",
    justifyContent:"center",
  },
  navText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1C1F24",
    textAlign:"center"
  },
});
