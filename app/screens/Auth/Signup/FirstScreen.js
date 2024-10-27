import React, { useState, useEffect} from 'react';
import api from '../../../api/auth';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, Modal, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as LocalAuthentication from 'expo-local-authentication';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import fingerImage from '../../../assets/Group.png';
import faceImage from '../../../assets/Vector.png'


export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  // const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isFacialIDSupported, setIsFacialIdSupported] = useState(false); 
  const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      // setIsBiometricSupported(compatible);
      setIsFacialIdSupported(compatible);
      setIsFingerprintSupported(compatible);
    })();
  }, []);

   const handleFacialIDAuth = async () => {
    const savedFaceId = await LocalAuthentication.isEnrolledAsync();
    if (!savedFaceId) {
      Toast.show({
        type: 'error',
        text1: 'Biometric record not found',
        text2: 'Please ensure you have set up biometrics in your device settings',
      });
    }
  
    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return Toast.show({
        type: 'error',
        text1: 'Facial recognition not supported',
        text2: 'Please ensure your device supports Facial recognition authentication.',
      });
    }
  
    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use facial recognition to access your account',
      // fallbackLabel: 'Enter Password',
      // disableDeviceFallback: true,
    });
  
    if (success) {   
      const faceidToken = await AsyncStorage.getItem('bioToken');
      const email = await AsyncStorage.getItem('email');
      if (!email) {
        return Toast.show({
          type: 'error', 
          text1: 'Please login with your email and password to acesss your account',
        });
      }

      if (!faceidToken) {
        return Toast.show({
          type: 'error', 
          text1: 'You have not setup FaceID Authentication on your account'
        });
      } 

      const getLocation= await AsyncStorage.getItem('userLocation');
      const stringLocation = JSON.parse(getLocation);
      const location = {
        long: stringLocation.longitude,
        lat: stringLocation.latitude,
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
      const response = await facialIDApi.loginWithPincode(email, faceidToken, deviceInfo, location);
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

      const getLocation= await AsyncStorage.getItem('userLocation');
      const stringLocation = JSON.parse(getLocation);
      
      const location = {
        long: stringLocation.longitude,
        lat: stringLocation.latitude,
      }
    
        const response = await api.fingerprintLogin(email, fingerprintToken, deviceInfo, location);
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
       <View style={styles.mainContent}>
          <View style={styles.topContent}>
            <Centerlogo logoWidth='100%' logoHeight= '35%'/>
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
                    <TouchableOpacity onPress={()=> navigation.navigate('RecoveryEmail')}>
                      <Text style={styles.modalItem}>Account Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Faq</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.socialsLogo}>
             <View style={styles.eachLogo}>
                <TouchableOpacity style={styles.logo} onPress={handleFingerprintAuth}>
                  <Image source={fingerImage} style={styles.img} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.socialText}>Finger ID</Text>
             </View>
             <View style={styles.eachLogo}>
                <TouchableOpacity style={styles.logo} onPress={handleFacialIDAuth}>
                  <Image source={faceImage} style={styles.img} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.socialText}>Face ID</Text>
             </View>
          </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginOptions')}>
              <Text style={styles.otherLogin}>Other Sign In Options</Text>
            </TouchableOpacity>
        </View>

          <View style={styles.three}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.signupText}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.privacyText}>Privacy</Text>
            </TouchableOpacity>
        </View>
        
          <View style={styles.bottomContainer}>
            <Text style={styles.unitedText}>United States of America</Text>
            <Text style={styles.bottomtexts}>Veteran Owned Business</Text>
            <Text>
              <FontAwesome name="registered" size={14} color="#1f1f1f" />
              <Text style={styles.bottomtexts}> 2024 RYDEPRO, </Text>
              <Text style={styles.bottomtexts}>All Rights Reserved</Text>
            </Text>
          </View>
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
  centerContent:{
    flex: 1,
    width: '100%',
  },
  socialsLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  socialText: {
    fontSize: 16,
    color: '#0E0E0E',
    fontWeight: '700',
    marginTop: 10
  },
  eachLogo: {
    alignItems: 'center',
  },
  logo: {
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 10,
    borderRadius: 50
  },
  img: {
    width: 50,
    height: 50,
  },
  otherLogin: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '15%',
    color: '#464646',
  },
  dotsButton: {
    position: 'absolute',
    right: 20,
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
  three: {
    flexDirection: 'row',
    marginTop: '40%',
  },
  signupText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    borderRightWidth: 2,
    borderRightColor: '#D0D0D0',
    paddingHorizontal: 10,
  },
  privacyText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    paddingHorizontal: 10,
  },
    bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  bottomtexts: {
    color: '#0E0E0E',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: '2%'
  },
  unitedText: {
    fontSize: 14,
    color: '#0E0E0E',
    textAlign: 'center',
    marginBottom: '2%'
  },
});
