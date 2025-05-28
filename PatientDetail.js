import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PatientDetail = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const [selected, setSelected] = useState(null);
  const [sexOpen, setSexOpen] = useState(false);
  const [sexValue, setSexValue] = useState('Female');
  const [sexItems, setSexItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const levels = [
    { label: 'Low', value: 'low', color: '#4cd964', icon: 'signal-cellular-1-bar' },
    { label: 'Medium', value: 'medium', color: '#ffcc00', icon: 'signal-cellular-2-bar' },
    { label: 'High', value: 'high', color: '#ff3b30', icon: 'signal-cellular-3-bar' },
  ];

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile({
          name: file.name || 'Unnamed file',
          size: file.size || 0,
          uri: file.uri
        });
      }
    } catch (error) {
      console.error('Document Picker Error:', error);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient's Referral</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <TouchableOpacity style={styles.progressStep} onPress={() => navigation.navigate('ReferringDetails')}>
            <Text style={styles.progressStepNumber}>1.</Text>
            <Text style={styles.progressStepText}>Referring Details</Text>
          </TouchableOpacity>
          <View style={styles.progressSeparator} />
          <TouchableOpacity style={styles.progressStep} onPress={() => navigation.navigate('PatientDetail')}>
            <Text style={styles.progressStepNumber}>2.</Text>
            <Text style={styles.progressStepTextActive}>Patient Detail</Text>
          </TouchableOpacity>
          <View style={styles.progressSeparator} />
          <TouchableOpacity style={styles.progressStep}>
            <Text style={styles.progressStepNumber}>3.</Text>
            <Text style={styles.progressStepText}>Review</Text>
          </TouchableOpacity>
        </View>

        {/* Patient Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Basic detail</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter patient's name" value="name" />
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Age</Text>
              <TextInput style={styles.input} placeholder="Age" value="age" />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Sex</Text>
              <DropDownPicker
                open={sexOpen}
                value={sexValue}
                items={sexItems}
                setOpen={setSexOpen}
                setValue={setSexValue}
                setItems={setSexItems}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropDownContainerStyle={styles.dropdownDropDownContainer}
                zIndex={1000}
              />
            </View>
          </View>
        </View>

        {/* Diagnosis Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis Information</Text>
          <Text style={styles.label}>Diagnosis Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Congenital Pyloric Stenosis."
           
          />
        </View>

        {/* File Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Document</Text>

          {!selectedFile ? (
            <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
              <AntDesign name="cloudupload" size={32} color="gray" />
              <Text style={styles.uploadPrompt}>Upload a document or file</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.documentCard}>
              <FontAwesome5 name="file-pdf" size={24} color="gray" />
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{selectedFile.name}</Text>
                <Text style={styles.documentSize}>{(selectedFile.size / 1024).toFixed(2)} KB</Text>
              </View>
              <TouchableOpacity style={styles.deleteIcon} onPress={handleRemoveFile}>
                <AntDesign name="delete" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Text>Include lab results, imaging scans, medical notesor any other files that can help 
            the receiving personnel
            provide the best care.
          </Text>
        </View>
        <View style={styles.container}>
      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Write any other observation here..."
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
      />
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Emergency level</Text>
      <View style={styles.radioGroup}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={styles.radioItem}
            onPress={() => setSelected(level.value)}
          >
              <View style={[styles.radioCircle, selected === level.value && styles.radioSelected]} />
            <Text style={styles.radioLabel}>{level.label}</Text>
            <MaterialIcons
              name={level.icon}
              size={20}
              color={level.color}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        ))}
    </View>
    
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Review')}>
        <Text style={styles.buttonText}>Review information</Text>
        <MaterialIcons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    margin:20
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  radioItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#007aff',
    backgroundColor: '#007aff',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0052cc',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#888',
  },
  progressStepText: {
    fontSize: 16,
    color: '#888',
  },
  progressStepTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    borderBottomWidth: 2,
    borderColor: '#007bff',
    paddingBottom: 5,
  },
  progressSeparator: {
    flex: 1,
    height: 2,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#555',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  dropdownContainer: {
    height: 50,
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownDropDownContainer: {
    borderColor: '#ddd',
    borderRadius: 8,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  uploadPrompt: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  documentSize: {
    fontSize: 14,
    color: '#666',
  },
  deleteIcon: {
    marginLeft: 15,
    padding: 5,
  },
});

export default PatientDetail;
