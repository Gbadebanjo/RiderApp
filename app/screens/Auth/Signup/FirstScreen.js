import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/Logo Image.png');

export default function FirstScreen({ navigation }) {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);

    if (address.length > 0) {
      const { country, region: state, city, postalCode: zipCode } = address[0];
      const locationDetails = { country, state, city, zipCode };
      console.log('Location Details:', locationDetails);
      await AsyncStorage.setItem('userLocation', JSON.stringify(locationDetails));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>New Era of On Demand Transportation.</Text>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Create an Account"
          onPress={() => navigation.navigate('CreateAccount')}
          width="80%"
          height={53}
          paddingVertical={10}
          marginTop={10}
          backgroundColor="#212121"
          borderWidth={2}
          TextColor="#fff"
          iconName="angle-right" />

        <StyledButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          width="80%"
          height={53}
          paddingVertical={10}
          marginTop={10}
          backgroundColor="#fff"
          borderColor="#212121"
          borderWidth={1}
          TextColor="#212121"
          iconName="angle-right" />

        <TouchableOpacity onPress={() => navigation.navigate('WelcomeGuest')}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 40,
    width: '100%',
  },
  logo: {
    marginTop: 30,
  },
  title: {
    width: '80%',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  guestText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
});