import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientReferral from './PatientReferral'; 
import PatientDetail from './PatientDetail';   
import Review from './Review';
import Multistep from './Multistep';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PatientReferral"
        screenOptions={{
          headerShown: false,
        }}
      >

        
     
     
        
        <Stack.Screen name="PatientReferral" component={PatientReferral} />
        <Stack.Screen name="PatientDetail" component={PatientDetail} />
        <Stack.Screen name="Review" component={Review}/>
        <Stack.Screen name="Multistep" component={Multistep}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});