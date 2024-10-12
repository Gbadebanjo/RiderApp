import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import  passwordApi  from '../../api/auth';
import { setAuthToken } from '../../api/client';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const originScreen = route.params?.originScreen;

  const handlePasswordSubmit = async () => {
    if (!password) {
      return Toast.show({
        type: 'error',
        text1: 'Password is required',
      });
    }

    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);

    try {
      // console.log('Password:', password);
      const response = await passwordApi.confirmPassword(password);
      if (!response.ok) {
        return Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
      navigation.navigate(originScreen, { success: true , action: route.params?.action });
    }
    catch (error) {
      // console.error('An error occurred:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again.',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/Icons/game-icons_padlock.png')} style={styles.image} />
      <Text style={styles.label}>Enter App Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handlePasswordSubmit} // Submit on completion
        returnKeyType='Submit' // Change the return key to 'Submit'
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
        <Ionicons name="arrow-back" size={24} color='#8d8d8d' />
        <Text style={{ color: '#8d8d8d' }}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#212121',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#8d8d8d',
    marginVertical: 30,
    marginHorizontal: 80,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  backArrow: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});


