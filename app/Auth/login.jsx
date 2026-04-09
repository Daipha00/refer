import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import UserNav from '../../components/userNav';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAFF" />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Back, Doctor</Text>
          <Text style={styles.headerSubtitle}>
            Good to see you again! Log in to pick up right where you left off.
          </Text>
        </View>

        <View style={styles.navWrap}>
          <UserNav />
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter your email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="doctor@hospital.go.ug"
              placeholderTextColor="#98A2B3"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter your password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="enter your password"
              placeholderTextColor="#98A2B3"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordWrap}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    color: '#202531',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 14,
  },
  headerSubtitle: {
    color: '#667085',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
  navWrap: {
    marginBottom: 38,
  },
  form: {
    width: '100%',
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
  forgotPasswordWrap: {
    alignItems: 'flex-end',
    marginTop: -6,
    marginBottom: 34,
  },
  forgotPassword: {
    color: '#0F4CBA',
    fontSize: 15,
    fontWeight: '500',
  },
  loginButton: {
    minHeight: 48,
    borderRadius: 6,
    backgroundColor: '#0F4CBA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
