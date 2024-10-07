import React, { useState, useEffect } from 'react';
import api from '../../../api/auth';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

const appleLogo = require('./../../../assets/AppleLogo.png');

export default function Login({navigation}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  
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
       <View style={styles.mainContent}>
          <View style={styles.topContent}>
            <Centerlogo logoWidth='100%' logoHeight= '40%'/>
            <TouchableOpacity onPress={toggleModal} style={styles.dotsButton}>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>      

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
                animationType="fade"
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={()=> alert('Contact us')}>
                      <Text style={styles.modalItem}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> alert('Contact us')}>
                      <Text style={styles.modalItem}>Faq</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('EnterEmail')}>
                      <Text style={styles.modalItem}>Account Recovery</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.socialsLogo}>
              <SocialLogo text="Fingerprint" onPress={ ()=> navigation.navigate('UseFingerprint')} logo={<Ionicons name="finger-print" size={40} color='#fff' style={styles.logo} />} containerWidth='20%'/>
              <SocialLogo text="Face ID" onPress={()=> navigation.navigate('UseFaceid')} logo={<AntDesign name="scan1" size={40} color='#fff' style={styles.logo}/>} containerWidth='20%'/>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginOptions')}>
              <Text style={styles.otherLogin}>Other Login Options</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'space-between',
    width: '100%',
  },
  topContent: {
    width: '100%',
    flexDirection: 'row',
  },
  dotsContainer: {
    position: 'absolute',
    top: 0,
    right: 4,
    padding: 10,
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 22,
    fontWeight: '600',
    color: '#212121'
  },
  centerContent:{
    flex: 1,
    width: '100%',
  },
  socialsLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  logo: {
    backgroundColor: '#909090',
    borderRadius: 100,
    borderColor: '#000',
    paddingLeft: '22%',
    width: '100%',
    paddingVertical: '24%', 
  },
  socialsLogo2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
    width: '100%',
  },
  otherLogin: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '15%',
    color: '#464646',
  },
  loginText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#212121',
    marginBottom: '10%'
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
  dotsButton: {
    position: 'absolute',
    right: 20,
  },
  dotsText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 20,
  },
  modalItem: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
});
