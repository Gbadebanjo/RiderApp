import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import passwordApi from '../../api/auth';
import { setAuthToken } from '../../api/client';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PinPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await passwordApi.confirmPassword(password);
      if (!response.ok) {
        setError(response.data.message);
        return Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
      navigation.navigate('CreatePinScreen');
    } catch (error) {
      setError('An error occurred. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
        <Feather name="chevron-left" size={24} color='#111' />
      </TouchableOpacity>
      <Image source={require('../../assets/Icons/game-icons_padlockB.png')} style={styles.image} />
      <Text style={styles.label}>Enter App Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handlePasswordSubmit} // Submit on completion
          returnKeyType='send' // Change the return key to 'Send'
          placeholder="Password" // Added placeholder for better UX
          placeholderTextColor="#aaa" // Placeholder color
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}  // Change icon based on state
            size={24}
            color="#8d8d8d"
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fcfcfc',
  },
  image: {
    width: 60,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0e0e0e',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#8d8d8d',
    marginVertical: 30,
    marginHorizontal: 80,
    paddingLeft: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,  // Ensure input takes up most of the space
    color: '#0e0e0e',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
});
