import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import passwordApi from '../../api/auth';
import { setAuthToken } from '../../api/client';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePinSCreen({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreatePin = async () => {
    if (!password || password.length !== 6) {
      setError('Pincode must be exactly 6 digits');
      return Toast.show({
        type: 'error',
        text1: 'Pincode Error',
        text2: 'Pincode must be exactly 6 digits.',
      });
    }

    setError('');
    navigation.navigate('ConfirmPinScreen', { password });
  }

  const handleInputChange = (text) => {
    // Ensure that only numeric input is allowed and limit it to 6 characters
    const formattedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setPassword(formattedText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/Icons/game-icons_padlock.png')} style={styles.image} />
      <Text style={styles.label}>Create New Pin</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        keyboardType='numeric'
        maxLength={6}
        onChangeText={setPassword}
        onSubmitEditing={handleCreatePin} // Submit on completion
        returnKeyType='Next' // Change the return key to 'Submit'
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


