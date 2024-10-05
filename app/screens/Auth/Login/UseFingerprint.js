import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialLogo from '../../../components/SocialLogo';
import { Ionicons } from '@expo/vector-icons';


export default function UseFingerprint({navigation}) {
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);  
  
    useEffect(() => {
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsFingerprintSupported(compatible);
      })();
    }, []);
  
    const handleFingerprintAuth = async () => {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        return Alert.alert(
          'Fingerprint record not found',
          'Please ensure you have set up fingerprint in your device settings.',
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
        // const biometricToken = await AsyncStorage.getItem('biometricToken');
        // console.log(biometricToken);
        // if (!biometricToken) {
        //   Alert.alert('Error', 'You have not setup Biometric Authentication on your account. Access your account through other authentication methods', [{ text: 'OK' }])
        //   return;
        // } 
        // const loginMethod = "biometric";
    
        // // send request to login with biometric authentication
        // const response = await api.biometricsLogin (biometricToken, loginMethod);
        // console.log(response.data);
        // if (!response.ok) {
        //   const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        //   return Alert.alert('Error', errorMessage, [
        //     {
        //       text: 'OK',
        //     },
        //   ]);
        // }
        // // save the biometricToken and token received in asyncStorage
        // await AsyncStorage.setItem('biometricToken', response.data.data.biometricToken);
        // await AsyncStorage.setItem('token', response.data.data.token);
    
        // return Alert.alert('Success', response.data.data.message, [
        return Alert.alert('Success', 'Login successful', [
          {
            text: 'OK',
            // onPress: () => navigation.navigate('MenuLanding'), 
          },
        ]);
      } else {
        Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
      }
    };


  return (
     <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.topcontent}>
            <Text style={styles.title}>Confirm Using Your Fingerprint</Text>
            <Text style={styles.subtitle}>You can use your fingerprint to confirm Account.</Text>
        </View>

        <View style={styles.maincontent}>
            <SocialLogo onPress={ ()=> handleFingerprintAuth()} logo={<Ionicons name="finger-print" size={40} color='#059B14' style={styles.logo} />} containerWidth='20%'/>
            <Text style={styles.subtitle}>Touch here to use fingerprint</Text>
        </View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    topcontent: {
        alignItems: 'center',
        width: '100%',
      },
    maincontent: {
        alignItems: 'center',
        width: '100%',
      },
    logo: {
        backgroundColor: '#000',
        borderRadius: 100,
        borderColor: '#000',
        paddingLeft: '22%',
        width: '100%',
        paddingVertical: '23%', 
      },
      title: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      subtitle: {
        marginTop: 15,
        fontSize: 14,
        textAlign: 'center',
      },
      cancel: {
        textAlign: 'start',
        marginLeft: '5%',
      }
})
