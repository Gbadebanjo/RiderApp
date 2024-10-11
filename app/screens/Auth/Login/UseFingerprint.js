import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import fingerprintApi from '../../../api/auth';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as LocalAuthentication from 'expo-local-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../context/AppContext';
import SocialLogo from '../../../components/SocialLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


export default function UseFingerprint({navigation}) {
    const [loading, setLoading] = useState(false);
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);  
    const { userDetails, setUserDetails } = useContext(AppContext);
  
    useEffect(() => {
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsFingerprintSupported(compatible);
      })();
    }, []);
  
    const handleFingerprintAuth = async () => {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        Toast.show({
          type: 'error',
          text1: 'Biometric record not found',
          text2: 'Please ensure you have set up biometrics in your device settings',
        });
      }
    
      const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        return Toast.show({
          type: 'error',
          text1: 'Fingerprint not supported',
          text2: 'Please ensure your device supports fingerprint authentication.',
        });
      }
    
      const { success, error } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Place your Finger to access your account',
        fallbackLabel: 'Enter Password',
      });
    
      if (success) {      
        const fingerprintToken = await AsyncStorage.getItem('bioToken');
        const email = await AsyncStorage.getItem('email');
        if (!email) {
          return Toast.show({
            type: 'error', 
            text1: 'Please login with your email and password to acesss your account',
          });
        }

        if (!fingerprintToken) {
          return Toast.show({
            type: 'error', 
            text1: 'You have not setup Biometric Authentication on your account'
          });
        } 
        
        let deviceId;

        if (Platform.OS === 'android') {
          deviceId = await Application.getAndroidId();
        } else if (Platform.OS === 'ios') {
          deviceId = await Application.getIosIdForVendorAsync();
        }
    
        const deviceInfo = {
           deviceType: Device.osName,
           deviceName: await Device.deviceName,
           deviceId: deviceId,
      }
    
        const response = await fingerprintApi.fingerprintLogin(email, fingerprintToken, deviceInfo);
        if (!response.ok) {
          setLoading(false);
          const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
          return Toast.show({
            type: 'error', 
            text1: errorMessage,
          });
        }
        Toast.show({
            type: 'success',
            text1: response.data.message,
        });
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('bioToken', response.data.bioToken);
        setUserDetails(response.data.rider);
    
        setLoading(false);
        return navigation.navigate('WelcomeHome');

      } else {
        return Toast.show({
          type: 'error', 
          text1: "Authentication Failed",
        });
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
