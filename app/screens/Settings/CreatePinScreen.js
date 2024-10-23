import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function CreatePinScreen({ navigation }) {
  const [pin, setPin] = useState(['', '', '', '']); // 4-digit PIN
  const [error, setError] = useState('');

  // Refs to move focus between inputs
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (text, index) => {
    const newPin = [...pin]; // Create a copy of the current pin state
    if (text.length <= 1) {
      newPin[index] = text;
      setPin(newPin);

      // Move focus to next input
      if (text && index < 3) {
        inputRefs[index + 1].current.focus();
      }

      // Automatically submit if all 4 digits are filled
      if (newPin.join('').length === 4) {
        handleCreatePin(newPin);
      }
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && index > 0 && !pin[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleCreatePin = (pin) => {
    if (pin.includes('') || pin.join('').length !== 4) {
      setError('Pincode must be exactly 4 digits');
      return Toast.show({
        type: 'error',
        text1: 'Pincode Error',
        text2: 'Pincode must be exactly 4 digits.',
      });
    }

    setError('');
    const fullPin = pin.join('');
    navigation.navigate('ConfirmPinScreen', { password: fullPin });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Feather name="chevron-left" size={24} color="#111" />
      </TouchableOpacity>

      <Image source={require('../../assets/Icons/game-icons_padlockB.png')} style={styles.image} />
      <Text style={styles.label}>Create New 4-digit Pin</Text>

      <View style={styles.pinContainer}>
        {pin.map((p, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]} // Ref for each input
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            value={pin[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
            secureTextEntry
            autoFocus={index === 0} // Automatically focus on the first input
          />
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={() => handleCreatePin(pin)} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fcfcfc',
  },
  backIcon: {
    paddingBottom: 70,
  },
  image: {
    width: 60,
    height: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#0c0c0c',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  pinInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
