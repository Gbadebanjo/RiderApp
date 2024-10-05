import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Alert, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/newRydeproLogo.png');
const signupImage = require('../../../assets/signupImage.png');

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Image source={logo} style={styles.logo} />
        <Image source={signupImage} style={styles.signupImage} />
        <Text style={styles.title}>Getting Started?</Text>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Create an account"
            onPress={() => navigation.navigate('MenuLanding')}
            appleLogo={true}
            width="88%"
            height={53}
            fontSize={16}
            paddingVertical={10}
            marginTop={10}
            backgroundColor="#212121"
            borderWidth={2}
            borderRadius={30}
            TextColor="#fff"
            />

          <StyledButton
            title="Create an account"
            onPress={() => navigation.navigate('CreateAccount')}
            googleLogo={require('../../../assets/GoogleIcon.png')}
            width="88%"
            height={53}
            fontSize={16}
            paddingVertical={10}
            marginTop={10}
            backgroundColor="#ffffff"
            borderWidth={1}
            borderRadius={30}
            borderColor='rgba(17, 17, 17, 0.1)'
            TextColor="#111111"
             />

          <StyledButton
            title="Create an account"
            onPress={() => navigation.navigate('CreateAccount')}
            emailLogo={true}
            width="88%"
            height={53}
            fontSize={16}
            paddingVertical={10}
            marginTop={10}
            backgroundColor="#ffffff"
            borderColor='rgba(17, 17, 17, 0.1)'
            borderWidth={1}
            borderRadius={30}
            TextColor="#111111"
             />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.guestText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    width: '100%',
  },
  logo: {
    // marginTop: 30,
    width: '30%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  signupImage: {
    marginTop: 40,
    width: '60%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 80,
  },
  title: {
    width: '80%',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 7,
    // marginBottom: 100,
  },
  guestText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '4%',
  },
});