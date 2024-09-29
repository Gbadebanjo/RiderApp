import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Switch, Dimensions, Modal, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../components/BackButton';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/newRydeproLogo.png');

export default function SetupSecurity({navigation}) {
    const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
    const [isFaceIDSupported, setIsFaceIDSupported] = useState(false);
    const [isFacialIDEnabled, setIsFacialIDEnabled] = useState(false);
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
      if (isFacialIDEnabled) {
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').height * 0.3,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(slideAnim, {
          toValue: Dimensions.get('window').height,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }, [isFacialIDEnabled]);
  
    const toggleFacialID = () => {
      setIsFacialIDEnabled(!isFacialIDEnabled);
    };

    const handleSwitchChange = async (value) => {
      setIsFingerprintEnabled(value);
      if (value) {
        await handleFingerprintAuth();
      }
    };

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
          promptMessage: 'Create Fingerprint',
          fallbackLabel: 'Enter Password',
        });
    
        if (success) {
          // retrieve token from asyncStorage and setAuth token
        //   const token = await AsyncStorage.getItem('token');
        //   console.log('token:', token);
        //   if (!token) {
        //     Alert.alert('Error', 'Authorization token not found.');
        //     return;
        //   }
        //   setAuthToken(token);
    
          // send request to enable biometric authentication
        //   const response = await authClient.put('/enable-biometric', { authToEnable: 'biometric' });
        //   console.log(response.data);
        //   if (!response.ok) {
        //     const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        //     return Alert.alert('Error', errorMessage, [
        //       {
        //         text: 'OK',
        //         onPress: () => navigation.navigate('Feedback'),
        //       },
        //     ]);
        //   }
        //   // console.log(response.data);
        //   // save the biometricToken token received in asyncStorage
        //   await AsyncStorage.setItem('biometricToken', response.data.data.biometricToken);
    
        //   return Alert.alert('Success', response.data.data.message, [
          return Alert.alert('Success', 'fingerprint registered successfully', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('ThankYou'),
            },
          ]);
        } else {
          Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
        }
      };

      useEffect(() => {
        (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsFaceIDSupported(compatible);
        })();
      }, []);

      const handleFacialIDAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
          return Alert.alert(
            'Biometric record not found',
            'Please ensure you have set up biometrics in your device settings.',
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
          fallbackLabel: 'Enter Password',
        });
      
        if (success) {      
        //   // retrieve token from asyncStorage and setAuth token
        //   const token = await AsyncStorage.getItem('token');
        //   if (!token) {
        //     Alert.alert('Error', 'Authorization token not found.');
        //     return;
        //   }
        //   setAuthToken(token);
      
        //   // send request to enable biometric authentication
        //   const response = await authClient.put('/enable-biometric', { authToEnable: 'facial' });
          
        //   if (!response.ok) {
        //     const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        //     return Alert.alert('Error', errorMessage, [
        //         {
        //           text: 'OK',
        //            onPress: () => navigation.navigate('Feedback'), 
        //         },
        //     ]);
        //   }
      
        //   // save the biometricToken token received in asyncStorage
        //   await AsyncStorage.setItem('facialToken', response.data.data.facialToken);
      
          // return Alert.alert('Success', response.data.data.message, [
          return Alert.alert('Success', "Facial ID has been added succesfully", [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Feedback'), 
            },
          ]);
        } else {
          Alert.alert('Authentication Failed', error, [
            { 
            text: 'OK',
            onPress: () => navigation.navigate('Feedback'),  
          }
        ]);
        }
      };

    const handleSubmit = () => {
        navigation.navigate('SetupSecurity');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <View style={styles.titleContainer}> 
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                    <BackButton style={styles.Icon} iconColor="#ffffff"/>
                </TouchableOpacity>
                <Text style={styles.title}>Security</Text>
            </View>    
            <View  style={styles.securityOptions}>
                <Text style={styles.subtitle}>Choose Security Options</Text>

                <View style={styles.eachSecurity}>
                    <Text style={styles.text}>Facial identification</Text>
                    <Switch
                        value={isFacialIDEnabled}
                        onValueChange={toggleFacialID}
                        trackColor={{ false: '#ffffff', true: '#ffffff' }}
                        thumbColor={isFacialIDEnabled ? '#767577' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>

                <View style={styles.eachSecurity}>
                    <Text style={styles.text}>Fingerprint</Text>
                    <Switch
                        value={isFingerprintEnabled}
                        onValueChange={handleSwitchChange}
                        trackColor={{ false: '#ffffff', true: '#ffffff' }}
                        thumbColor={isFingerprintEnabled ? '#767577' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <StyledButton
                    title="Cancel"
                    // onPress={handleSubmit}
                    width="30%"
                    paddingVertical={10}
                    marginTop={0}
                    backgroundColor="#000000"
                    borderWidth={0}
                    TextColor="#FFFFFF"
                    borderRadius={10}
                    fontSize={15}
                />

                <StyledButton
                    title="Proceed"
                    onPress={handleSubmit}
                    width="30%"
                    paddingVertical={10}
                    marginTop={0}
                    backgroundColor="#FFFFFF"
                    borderWidth={2}
                    TextColor="#000000"
                    borderRadius={15} 
                    fontSize={15}
                />
        </View>   

          <Modal
              transparent={true}
              visible={isFacialIDEnabled}
              animationType="none"
              // onRequestClose={toggleFacialID}
            >
          <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalContent}>
                <View style={styles.topSection}>
                  <Text style={styles.modalTitle}>Verify It's You</Text>
                  <Text style={styles.modalText}>You can use face authentication to secure your accounts</Text>
                  <Image source={logo} style={styles.logo} />
                  <Text style={styles.modalCenterText}>Tap Confirm to complete</Text>
                </View>


                <View style={styles.bottomSection}>
                  <TouchableOpacity style={styles.cancelbutton} onPress={toggleFacialID}>
                    <Text style={styles.buttonText1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmbutton} onPress={handleFacialIDAuth}>
                    <Text style={styles.buttonText2}>Confirm</Text>
                  </TouchableOpacity>
                </View>

            </View>
          </Animated.View>
        </Modal>     
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    securityOptions: {
        flex: 1,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    eachSecurity: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    fingerprint: {
       borderWidth: 1.5,
       borderRadius: 8,
       padding: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modal: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    modalContent: {
      width: '90%',
      // flexDirection: 'column',
      marginTop: 70,
      justifyContent: 'space-between',
      gap: 70
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center'
    },
    modalText: {
      fontSize: 16,
      textAlign: 'center',
    },
    modalCenterText: {
      fontSize: 12,
      textAlign: 'center',
    },
    topSection: {
      // flex: 1,
      // justifyContent: 'flex-start'
    },
    logo: {
      width: '30%',
      aspectRatio: 1,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 50,
      marginBottom: 20,
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: 0, 
    },
    cancelbutton: {
      padding: 10,
      width: '25%',
      backgroundColor: '#fff',
      borderRadius: 8,
      justifyContent: 'center',
    },
    confirmbutton: {
      padding: 10,
      backgroundColor: '#000',
      borderRadius: 8,
      width: '25%',
      justifyContent: 'center'
    },
    buttonText1: {
      color: '#000',
      fontSize: 14,
      textAlign: 'start',
    },
    buttonText2: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
});