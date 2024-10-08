import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsPasswordScreen ({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const originScreen = route.params?.originScreen;

  const handlePasswordSubmit = () => {
    const validPassword = "12345"; // Replace this with real password validation logic
    if (password === validPassword) {
      setError('');
      navigation.navigate('FacialIdToggle', { success: true }); // Route back to toggle screen
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <Image source = {require('../../assets/Icons/game-icons_padlock.png')} style = {styles.image} />
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
});
