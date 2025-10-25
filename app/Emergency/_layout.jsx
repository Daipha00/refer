import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import Multistep from '../Referring/Multistep';
import PatientRefferal from '../Referring/PatientRefferal';
import PatientDetail from '../Referring/PatientDetail'; 
import Review from '../Referring/Review';

export default function RootLayout() {
  return (
<SafeAreaView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Emergency" options={{ headerShown: false }} />
        <Stack.Screen name="Multistep" component={Multistep} />
          <Stack.Screen name="PatientRefferal" component={PatientRefferal} />
          <Stack.Screen name="PatientDetail" component={PatientDetail} />
          <Stack.Screen name="Review" component={Review} />
      </Stack>
    </SafeAreaView>
  );
}
