import { Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";
import Multistep from "../Referring/Multistep";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* ✅ Multistep stays visible across navigation */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <Multistep />
      </View>

      {/* ✅ Below the Multistep, navigation happens */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </SafeAreaView>
  );
}
