// import React, { useState } from 'react';
// import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
// import PatientRefferal from './PatientRefferal';
// import PatientDetail from './PatientDetail';
// import Review from './Review';

// const Multistep = () => {
//   const [step, setStep] = useState(1);

//   const renderStep = () => {
//     if (step === 1) return <PatientRefferal />;
//     if (step === 2) return <PatientDetail />;
//     if (step === 3) return <Review />;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.navbar}>
//         <TouchableOpacity onPress={() => setStep(1)}>
//           <Text style={[styles.stepText, step === 1 && styles.activeStep]}>1. Referral</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setStep(2)}>
//           <Text style={[styles.stepText, step === 2 && styles.activeStep]}>2. Patient Detail</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setStep(3)}>
//           <Text style={[styles.stepText, step === 3 && styles.activeStep]}>3. Review</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView style={styles.content}>{renderStep()}</ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Multistep;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 15,
//   },
//   stepText: {
//     fontSize: 16,
//     color: '#555',
//   },
//   activeStep: {
//     color: '#007bff',
//     fontWeight: 'bold',
//     borderBottomWidth: 2,
//     borderColor: '#007bff',
//     paddingBottom: 3,
//   },
//   content: {
//     flex: 1,
//     padding: 15,
//   },
// });


import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import PatientRefferal from "./PatientRefferal";
import PatientDetail from "./PatientDetail";
import Review from "./Review";

export default function Multistep() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PatientRefferal onNext={() => setStep(2)} />;
      case 2:
        return <PatientDetail onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3:
        return <Review onBack={() => setStep(2)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar always visible */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setStep(1)}>
          <Text style={[styles.stepText, step === 1 && styles.activeStep]}>1. Referral</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(2)}>
          <Text style={[styles.stepText, step === 2 && styles.activeStep]}>2. Patient Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(3)}>
          <Text style={[styles.stepText, step === 3 && styles.activeStep]}>3. Review</Text>
        </TouchableOpacity>
      </View>

      {/* Current step content */}
      <ScrollView style={styles.content}>{renderStep()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
  },
  stepText: { fontSize: 16, color: "#555" },
  activeStep: {
    color: "#007bff",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#007bff",
    paddingBottom: 3,
  },
  content: { flex: 1, padding: 15 },
});
