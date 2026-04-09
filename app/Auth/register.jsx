import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import UserNav from '../../components/userNav';

const steps = ['Basic Detail', 'Professional Detail', 'Password'];

const professionOptions = ['Doctor', 'Nurse', 'Nutritionist'];
const levelOptions = ['Medical Officer', 'Consultant', 'Specialist'];
const hospitalOptions = ['Mulago National Referral Hospital', 'Mbarara Regional Referral Hospital'];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Female',
    phoneNumber: '',
    email: '',
    medicalProfession: 'Doctor',
    licenseNumber: '',
    professionLevel: 'Medical Officer',
    departments: ['Surgeon', 'Pediatrician'],
    primaryHospital: 'Mulago National Referral Hospital',
    password: '',
    confirmPassword: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const removeDepartment = (index) => {
    updateFormData(
      'departments',
      formData.departments.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepLine,
              index < currentStep && styles.completedStepLine,
              index === currentStep && styles.activeStepLine,
            ]}
          />
          <Text
            style={[
              styles.stepText,
              index < currentStep && styles.completedStepText,
              index === currentStep && styles.activeStepText,
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderInput = ({ label, value, onChangeText, placeholder, helperText, keyboardType, secureTextEntry }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#98A2B3"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );

  const renderSelect = ({ label, value }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectField}>
        <Text style={styles.selectText}>{value}</Text>
        <Ionicons name="chevron-down-outline" size={18} color="#667085" />
      </View>
    </View>
  );

  const renderBasicDetails = () => (
    <View style={styles.formContainer}>
      {renderInput({
        label: 'Full Name',
        value: formData.fullName,
        onChangeText: (text) => updateFormData('fullName', text),
        placeholder: 'John Doe',
        helperText: 'Enter your name as it appears on your medical license',
      })}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          {['Female', 'Male'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={styles.radioOption}
              onPress={() => updateFormData('gender', gender)}
            >
              <View style={[styles.radio, formData.gender === gender && styles.radioSelected]}>
                {formData.gender === gender ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.radioText}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {renderInput({
        label: 'Phone Number',
        value: formData.phoneNumber,
        onChangeText: (text) => updateFormData('phoneNumber', text),
        placeholder: '+256 772 123 456',
        helperText: 'Your work or official contact number',
        keyboardType: 'phone-pad',
      })}

      {renderInput({
        label: 'Email Address',
        value: formData.email,
        onChangeText: (text) => updateFormData('email', text),
        placeholder: 'doctor@hospital.go.ug',
        helperText: "We'll send a verification link to this email",
        keyboardType: 'email-address',
      })}
    </View>
  );

  const renderProfessionalDetails = () => (
    <View style={styles.formContainer}>
      {renderSelect({
        label: 'Medical Profession',
        value: formData.medicalProfession || professionOptions[0],
      })}

      {renderInput({
        label: 'Medical License Number',
        value: formData.licenseNumber,
        onChangeText: (text) => updateFormData('licenseNumber', text),
        placeholder: 'UMC - 2024 - .......',
        helperText: 'Your Uganda Medical Council registration number',
      })}

      {renderSelect({
        label: 'Profession Level',
        value: formData.professionLevel || levelOptions[0],
      })}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Current Department</Text>
        <View style={styles.departmentContainer}>
          <View style={styles.departmentTagsWrap}>
            {formData.departments.map((dept, index) => (
              <View key={`${dept}-${index}`} style={styles.departmentTag}>
                <Text style={styles.departmentText}>{dept}</Text>
                <TouchableOpacity onPress={() => removeDepartment(index)} hitSlop={6}>
                  <Ionicons name="close" size={16} color="#667085" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Ionicons name="chevron-down-outline" size={18} color="#667085" />
        </View>
      </View>

      {renderSelect({
        label: 'Primary Hospital',
        value: formData.primaryHospital || hospitalOptions[0],
      })}
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.formContainer}>
      {renderInput({
        label: 'Create Password',
        value: formData.password,
        onChangeText: (text) => updateFormData('password', text),
        placeholder: 'enter a strong password',
        helperText: 'Must be at least 8 characters',
        secureTextEntry: true,
      })}

      {renderInput({
        label: 'Re-enter Password',
        value: formData.confirmPassword,
        onChangeText: (text) => updateFormData('confirmPassword', text),
        placeholder: 'enter a strong password',
        helperText: 'Must be at least 8 characters',
        secureTextEntry: true,
      })}

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you agree to our terms of service and privacy policy. Your information will be
          verified with the Uganda Medical Council.
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    if (currentStep === 0) return renderBasicDetails();
    if (currentStep === 1) return renderProfessionalDetails();
    return renderPasswordStep();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFF" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.backWrap}>
            {currentStep > 0 ? (
              <TouchableOpacity onPress={handleBack} hitSlop={8}>
                <Ionicons name="chevron-back-outline" size={26} color="#202531" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Join the Medical Referral Network</Text>
            <Text style={styles.headerSubtitle}>Connect with hospitals and specialists across Uganda</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <UserNav />
        </View>

        {renderStepIndicator()}
        {renderCurrentStep()}

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {currentStep === steps.length - 1 ? 'Create Account' : 'Continue'}
          </Text>
          {currentStep < steps.length - 1 ? (
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.buttonIcon} />
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 21,
  },
  backWrap: {
    width: 32,
    marginRight: 8,
    paddingTop: 13,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    color: '#202531',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 13,
  },
  headerSubtitle: {
    color: '#667085',
    fontSize: 16,
    lineHeight: 24,
  },
  tabContainer: {
    marginBottom: 14,
  },
  stepContainer: {
    flexDirection: 'row',
    columnGap: 12,
    marginBottom: 28,
  },
  stepItem: {
    flex: 1,
  },
  stepLine: {
    height: 2,
    borderRadius: 999,
    backgroundColor: '#667085',
    marginBottom: 8,
  },
  completedStepLine: {
    backgroundColor: '#1E7A39',
  },
  activeStepLine: {
    backgroundColor: '#2563EB',
  },
  stepText: {
    color: '#667085',
    fontSize: 13,
  },
  completedStepText: {
    color: '#1E7A39',
  },
  activeStepText: {
    color: '#2563EB',
  },
  formContainer: {
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#475467',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#CAD5E2',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#202531',
    fontSize: 16,
  },
  helperText: {
    color: '#667085',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    columnGap: 34,
    paddingVertical: 6,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  radioText: {
    color: '#475467',
    fontSize: 16,
  },
  selectField: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#CAD5E2',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: '#667085',
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  departmentContainer: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  departmentTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
    marginRight: 10,
  },
  departmentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  departmentText: {
    color: '#475467',
    fontSize: 15,
    marginRight: 6,
  },
  termsContainer: {
    backgroundColor: '#EEF2F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  termsText: {
    color: '#344054',
    fontSize: 14,
    lineHeight: 24,
  },
  continueButton: {
    minHeight: 48,
    borderRadius: 6,
    backgroundColor: '#0F4CBA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
