import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Switch, Dimensions, Modal, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';
import SecurityModal from '../../components/SecurityModal';
import { setAuthToken } from '../../api/client';
import fingerPrintApi from '../../api/auth';
import { AppContext } from '../../context/AppContext';

const face = require('../../assets/Face.png');

export default function BiometricToggle({ navigation, route }) {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
    const [isFacialIDEnabled, setIsFacialIDEnabled] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    let newValue;

    useEffect(() => {
        if (userDetails.authsEnabled.includes('fingerprint')) {
          setIsFingerprintEnabled(true);
        }
      }, [userDetails.authsEnabled]);

      const toggleFingerPrint = () => {
        setIsFingerprintEnabled((prevState) => !prevState);
        if (isFingerprintEnabled) {
          // When the toggle is ON and switching it OFF, route to password screen to confirm
          navigation.navigate('SettingsPasswordScreen', { originScreen: 'BiometricToggle', action: 'disable' });
        } else {
          navigation.navigate('SettingsPasswordScreen', { originScreen: 'BiometricToggle', action: 'enable' });
        }
      };

      useEffect(() => {
        if (route.params?.success) {
          const action = route.params?.action;
          // console.log('Action:', action);
          if (action === 'enable') {
            setModalActive(true);
          } else {
            SendDetails()
          }
        }
      }, [route.params?.success]);


      const SendDetails = async () => {
        isFingerprintEnabled === false ? newValue = false : true;
    
        const token = await AsyncStorage.getItem('userToken');
        setAuthToken(token);
    
        try {
          const response = await fingerPrintApi.updateFingerPrint({ value: newValue })
          if (!response.ok) {
            return Toast.show({
              type: 'error',
              text1: 'Update Failed',
              text2: response.data?.message || 'Something went wrong',
            });
          }
          Toast.show({
            type: 'success',
            text1: 'Finger Print Updated',
          });
          setUserDetails(response.data.rider)
          navigation.navigate('Security');
        }
        catch (error) {
          console.error('An error occurred:', error);
          Toast.show({
            type: 'error',
            text1: 'An error occurred. Please try again.',
          });
        }
      }

      const handleModalClose = () => {
        setModalActive(false);
      };

    useEffect(() => {
        if (isFingerprintEnabled) {
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
    }, [isFingerprintEnabled]);


    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsFingerprintSupported(compatible);
        })();
    }, []);

    const handleFingerprintAuth = async () => {
        // const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        // if (!savedBiometrics) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Biometric record not found',
        //         text2: 'Please ensure you have set up biometrics in your device settings',
        //     });
        // }

        const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            return Toast.show({
                type: 'error',
                text1: 'Fingerprint not supported',
                text2: 'Please ensure your device supports fingerprint authentication.',
            });
        }

        const { success, error } = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Create Fingerprint',
            fallbackLabel: 'Enter Password',
        });

        if (success) {
            SendDetails()
            setModalActive(false);
        } else {
            return Toast.show({
                type: 'error',
                text1: 'Fingerprint cannot be registered',
            });
        }
    };

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsFaceIDSupported(compatible);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <View style={styles.titleContainer}>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                    <BackButton style={styles.Icon} iconColor="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>Security</Text>
            </View>
            <View style={styles.securityOptions}>
                <Text style={styles.subtitle}>Fingerprint Management</Text>
                <View style={styles.eachSecurity}>
                    <Text style={styles.text}>Fingerprint</Text>
                    <Switch
                        value={isFingerprintEnabled}
                        onValueChange={toggleFingerPrint}
                        trackColor={{ false: '#ffffff', true: '#ffffff' }}
                        thumbColor={isFingerprintEnabled ? '#767577' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                    />
                </View>
            </View>

            
            <Modal
                transparent={true}
                visible={modalActive}
                animationType="none"
                onRequestClose={handleModalClose}
            >
                <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.modalContent}>
                        <View style={styles.topSection}>
                            <Text style={styles.modalTitle}>Verify It's You</Text>
                            <Text style={styles.modalText}>You can use face authentication to secure your accounts</Text>
                            <Image source={face} style={styles.logo} />
                            <Text style={styles.modalCenterText}>Tap Confirm to complete</Text>
                        </View>

                        <View style={styles.bottomSection}>
                            <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.goBack()}>
                                <Text style={styles.buttonText1}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmbutton} onPress={handleFingerprintAuth}>
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
        color: '#767676',
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
        top: '25%',
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