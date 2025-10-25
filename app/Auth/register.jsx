import { useState } from 'react';
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

import UserNav from '../../components/userNav';

const register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('create');

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    medicalProfession: '',
    licenseNumber: '',
    professionLevel: '',
    departments: ['Surgeon', 'Pediatrician'],
    primaryHospital: '',
    password: '',
    confirmPassword: '',
  });

  const steps = ['Basic Detail', 'Professional Detail', 'Password'];

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const removeDepartment = (index) => {
    const newDepartments = formData.departments.filter((_, i) => i !== index);
    updateFormData('departments', newDepartments);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {currentStep > 0 && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Join the Medical Referral Network</Text>
        <Text style={styles.headerSubtitle}>Connect with hospitals and specialists across Uganda</Text>
      </View>
    </View>
  );



  const renderTabs = () => (
    <View style={styles.tabContainer}>
      < UserNav />
    </View>
  );


  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepWrapper}>
          <View style={styles.stepItem}>
            <View style={[
              styles.stepLine,
              index < currentStep && styles.completedStepLine,
              index === currentStep && styles.activeStepLine,
              index > currentStep && styles.inactiveStepLine
            ]} />
            <Text style={[
              styles.stepText,
              index < currentStep && styles.completedStepText,
              index === currentStep && styles.activeStepText,
              index > currentStep && styles.inactiveStepText
            ]}>
              {step}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderBasicDetails = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => updateFormData('fullName', text)}
          placeholder="John Doe"
        />
        <Text style={styles.helperText}>Enter your name as it appears on your medical license</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateFormData('gender', 'Female')}
          >
            <View style={[styles.radio, formData.gender === 'Female' && styles.radioSelected]} />
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => updateFormData('gender', 'Male')}
          >
            <View style={[styles.radio, formData.gender === 'Male' && styles.radioSelected]} />
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => updateFormData('phoneNumber', text)}
          placeholder="+256 772 123 456"
          keyboardType="phone-pad"
        />
        <Text style={styles.helperText}>Your work or official contact number</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text)}
          placeholder="doctor@hospital.go.ug"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.helperText}>We'll send a verification link to this email</Text>
      </View>
    </View>
  );

  const renderProfessionalDetails = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Medical Profession</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{formData.medicalProfession}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Medical License Number</Text>
        <TextInput
          style={styles.input}
          value={formData.licenseNumber}
          onChangeText={(text) => updateFormData('licenseNumber', text)}
          placeholder="UMC - 2024 - ......."
        />
        <Text style={styles.helperText}>Your Uganda Medical Council registration number</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Profession Level</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{formData.professionLevel}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Current Department</Text>
        <View style={styles.departmentContainer}>
          {formData.departments.map((dept, index) => (
            <View key={index} style={styles.departmentTag}>
              <Text style={styles.departmentText}>{dept}</Text>
              <TouchableOpacity onPress={() => removeDepartment(index)}>
                <Text style={styles.removeTag}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Primary Hospital</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{formData.primaryHospital}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </View>
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Create Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => updateFormData('password', text)}
          placeholder="enter a strong password"
          secureTextEntry
        />
        <Text style={styles.helperText}>Must be at least 8 characters</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Re-enter Password</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => updateFormData('confirmPassword', text)}
          placeholder="enter a strong password"
          secureTextEntry
        />
        <Text style={styles.helperText}>Must be at least 8 characters</Text>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you agree to our terms of service and privacy policy.
          Your information will be verified with the Uganda Medical Council.
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicDetails();
      case 1:
        return renderProfessionalDetails();
      case 2:
        return renderPasswordStep();
      default:
        return renderBasicDetails();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderTabs()}
        {renderStepIndicator()}
        {renderCurrentStep()}

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {currentStep === 2 ? 'Create Account' : 'Continue →'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginHorizontal: 3,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },

  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stepItem: {
    alignItems: 'center',
    width: '100%',
  },
  stepLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#ddd',
    marginBottom: 10,
    borderRadius: 1.5,
  },
  completedStepLine: {
    backgroundColor: '#4caf50',
  },
  activeStepLine: {
    backgroundColor: '#1976d2',
  },
  inactiveStepLine: {
    backgroundColor: '#ddd',
  },
  stepText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  completedStepText: {
    color: '#4caf50',
  },
  activeStepText: {
    color: '#1976d2',
  },
  inactiveStepText: {
    color: '#999',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#1976d2',
    backgroundColor: '#1976d2',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  departmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 48,
  },
  departmentTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 4,
  },
  departmentText: {
    fontSize: 14,
    color: '#1976d2',
    marginRight: 5,
  },
  removeTag: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
  },
  termsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  continueButton: {
    backgroundColor: '#1976d2',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default register;