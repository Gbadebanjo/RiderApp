import React, { useState, useContext } from 'react';
import { TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import passwordApi from '../../api/auth';
import { setAuthToken } from '../../api/client';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';

export default function ConfirmPinSCreen({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const createdPassword = route.params?.password;
  const { setUserDetails } = useContext(AppContext);

  const handlePasswordSubmit = async () => {
    if (!password) {
      return Toast.show({
        type: 'error',
        text1: 'Pincode Error',
        text2: 'Please enter a pin.',
      });
    }

    // check password match
    if (password !== createdPassword) {
      setError('Pins do not match');
      return Toast.show({
        type: 'error',
        text1: 'Pincode Error',
        text2: 'Pins do not match. Please try again.',
      });
    }

    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);

    try {
      const response = await passwordApi.updatePin({ value: password });
      if (!response.ok) {
        return Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: response.data?.message || 'Something went wrong',
        });
      }
      Toast.show({
        type: 'success',
        text1: 'Pincode Updated',
      });
      setUserDetails(response.data.rider)
      navigation.navigate('Security');
    }
    catch (error) {
      console.error('An error occurred:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again.',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/Icons/game-icons_padlock.png')} style={styles.image} />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        keyboardType='numeric'
        maxLength={6}
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
    paddingTop: 180,
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
    marginVertical: 50,
    marginHorizontal: 80,
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


