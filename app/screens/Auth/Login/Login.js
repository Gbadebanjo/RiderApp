import React, { useState, useEffect } from 'react';
import api from '../../../api/auth';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
const googleLogo = require('./../../../assets/GoogleIcon.png');
const appleLogo = require('./../../../assets/AppleLogo.png');

export default function Login({navigation}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);  
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Biometric record not found',
        'Please ensure you have set up biometrics in your device settings.',
        [{ text: 'OK' }]
      );
    }
  
    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return Alert.alert(
        'Fingerprint not supported',
        'Please ensure your device supports fingerprint authentication.',
        [{ text: 'OK' }]
      );
    }
  
    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Place your Finger to access your account',
      fallbackLabel: 'Enter Password',
    });
  
    if (success) {      
      // retrieve biometricToken from asyncStorage
      const biometricToken = await AsyncStorage.getItem('biometricToken');
      console.log(biometricToken);
      if (!biometricToken) {
        Alert.alert('Error', 'You have not setup Biometric Authentication on your account. Access your account through other authentication methods', [{ text: 'OK' }])
        return;
      } 
      const loginMethod = "biometric";
  
      // send request to login with biometric authentication
      const response = await api.biometricsLogin (biometricToken, loginMethod);
      console.log(response.data);
      if (!response.ok) {
        const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        return Alert.alert('Error', errorMessage, [
          {
            text: 'OK',
          },
        ]);
      }
      // save the biometricToken and token received in asyncStorage
      await AsyncStorage.setItem('biometricToken', response.data.data.biometricToken);
      await AsyncStorage.setItem('token', response.data.data.token);
  
      return Alert.alert('Success', response.data.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MenuLanding'), 
        },
      ]);
    } else {
      Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
    }
  };

  const handleFacialIDAuth = async () => {
    const savedFaceId = await LocalAuthentication.isEnrolledAsync();
    if (!savedFaceId) {
      return Alert.alert(
        'FaceId record not found',
        'Please ensure you have set up FaceId  in your device settings.',
        [{ text: 'OK' }]
      );
    }
  
    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return Alert.alert(
        'Facial recognition not supported',
        'Please ensure your device supports Facial recognition authentication.',
        [{ text: 'OK' }]
      );
    }
  
    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use facial recognition to access your account',
      // fallbackLabel: 'Enter Password',
      // disableDeviceFallback: true,
    });


  
    if (success) {      
      // retrieve biometricToken from asyncStorage
      const facialToken = await AsyncStorage.getItem('facialToken');
      if (!facialToken) {
        Alert.alert('Error', 'You have not setup Face ID Authentication on your account. Access your account through other authentication methods', [{ text: 'OK' }])
        return;
      }
      const loginMethod = "facial";
  
      // send request to login with face ID authentication
      const response = await api.biometricsLogin(facialToken, loginMethod);
      if (!response.ok) {
        const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        return Alert.alert('Error', errorMessage, [
            {
              text: 'OK',
            },
        ]);
      }
  
      // save the biometricToken and token received in asyncStorage
      await AsyncStorage.setItem('facialToken', response.data.data.facialToken);
      await AsyncStorage.setItem('token', response.data.data.token);
  
      return Alert.alert('Success', response.data.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MenuLanding'), 
        },
      ]);
    } else {
      Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Centerlogo/>
      <Text style={styles.title}>Login to your Account</Text>

          <View style={styles.socialsLogo}>
            <SocialLogo text="Face ID" onPress={handleFacialIDAuth} logo={<AntDesign name="scan1" size={30} color='#7DB7FF'/>} />
            <SocialLogo text="Biometric" onPress={handleBiometricAuth} logo={<Ionicons name="finger-print" size={30} color='#0F488F' />}/>
            <SocialLogo text="Email" onPress={()=> navigation.navigate('UsePassword')} logo={<MaterialCommunityIcons name="email" size={30} color='#000000' />}/>
            <SocialLogo text="Apple" onPress={()=> alert('Login with Apple')} logo={appleLogo}/>
            <SocialLogo text="Google" onPress={()=> alert('Login with Google')} logo={googleLogo}/>
          </View>

          <View style={styles.socialsLogo2}>
            <SocialLogo text="Pincode" onPress={()=> navigation.navigate('UsePincode')} logo={<Ionicons name="key-outline" size={30} color='#0B6703' />}/>
            <SocialLogo text="Passphrase" onPress={()=> navigation.navigate('UsePassphrase')} logo={<MaterialCommunityIcons name="line-scan" size={30} color='black' />}/>
          </View>

          <TouchableOpacity onPress={() => alert('Account Recovery')}>
            <Text style={styles.loginText}>Account Recovery</Text>
          </TouchableOpacity>

          <StyledButton
            title="Create an Account"
            onPress={()=> navigation.navigate('CreateAccount')}
            width="100%"
            height={53}
            paddingVertical={10}
            marginTop={40}
            backgroundColor="#212121"
            borderWidth={2}
            TextColor="#fff"
            iconName="angle-right" 
            />

          <TouchableOpacity onPress={() => alert('Continue as Guest')}>
            <Text style={styles.loginText}>Continue as Guest</Text>
          </TouchableOpacity>

      <View style={styles.flexSpacer} />

      <Text style={styles.proceedText}>
        By proceeding, you agree to RYDEPRO’s Terms, Privacy Notice and can unsubscribe by emailing 
        <Text style={styles.boldText}> "Unsubscribe" </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal:30,
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 22,
    fontWeight: '600',
    color: '#212121'
  },
  socialsLogo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  socialsLogo2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  proceedText:{
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
    width: '100%',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  flexSpacer: {
    flex: 1,
  },
});
