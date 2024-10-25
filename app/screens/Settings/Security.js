import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Feather } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import * as LocalAuthentication from 'expo-local-authentication';
import authApi from '../../api/auth';  // Unified API import
import Toast from 'react-native-toast-message';
import { setAuthToken } from '../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

export default function Security({ navigation, route }) {
    const [isFacialIDEnabled, setIsFacialIDEnabled] = useState(false);
    const [isFingerIDEnabled, setIsFingerIDEnabled] = useState(false);
    const [isFingerprintSupported, setIsFingerprintSupported] = useState(false);
    const { userDetails, setUserDetails } = useContext(AppContext);


    // Check authentication status from userDetails
    useEffect(() => {
        if (userDetails?.authsEnabled?.includes('facialId')) {
            setIsFacialIDEnabled(true);
        }
        if (userDetails?.authsEnabled?.includes('fingerprint')) {
            setIsFingerIDEnabled(true);
        }
    }, [userDetails.authsEnabled]);

    const authenticateUser = async (type) => {
        const promptMessage = type === 'facialId' ? 'Authenticate using Face ID' : 'Create Fingerprint';
        const { success } = await LocalAuthentication.authenticateAsync({ promptMessage, fallbackLabel: 'Use Password' });
        return success;
    };

    const updateAuthentication = async (authType, newValue) => {
        const token = await AsyncStorage.getItem('userToken');
        setAuthToken(token);

        let deviceId;

        if (Platform.OS === 'android') {
            deviceId = await Application.getAndroidId();
        } else if (Platform.OS === 'ios') {
            deviceId = await Application.getIosIdForVendorAsync();
        }

        // Add a safety check here
    if (!deviceId) {
        console.error('Device ID is undefined!');
        return Toast.show({ type: 'error', text1: 'Device ID not found. Please try again.' });
    }

        const deviceInfo = {
            "deviceId": deviceId,
            "deviceName": await Device.deviceName,
            "deviceType": "Device.osName"
        }

        try {
            const payload = {
                value: newValue,
                deviceInfo
            };
            console.log('Payload', payload);
            // console.log('Updating', authType, payload);
            const response = await authApi.updateAuth(authType, payload);
            if (!response.ok) {
                console.log("error", response.data?.message)
                return Toast.show({
                    type: 'error',
                    text1: 'Update Failed',
                    text2: response.data?.message || 'Something went wrong',
                });
            }
            setUserDetails(response.data.rider);
            Toast.show({ type: 'success', text1: `${authType} Updated` });
        } catch (error) {
            console.error('An error occurred:', error);
            Toast.show({ type: 'error', text1: 'An error occurred. Please try again.' });
        }
    };

 
 
    
    const toggleAuth = async (authType, isEnabled, setEnabled) => {
        if (isEnabled) {
            navigation.navigate('SettingsPasswordScreen', { originScreen: 'Security', action: 'disable', authType });
        } else {
            const success = await authenticateUser(authType);
            if (success) {
                setEnabled(true);
                updateAuthentication(authType, true);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Authentication Failed',
                    text2: `${authType} authentication was not successful.`,
                });
            }
        }
    };

    useEffect(() => {

        if (route.params?.success && route.params?.action === 'disable') {
            const authType = route.params?.authType;
            if (authType === 'facialId') {
                setIsFacialIDEnabled(false);
            } else if (authType === 'fingerprint') {
                setIsFingerIDEnabled(false);
            }
            updateAuthentication(authType, false);  // Send false to the backend to disable the auth type
        }
    }, [route.params?.success]);

    // Check if fingerprint is supported
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsFingerprintSupported(compatible);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color='#111' />
                </TouchableOpacity>
                <Text style={styles.title}>Security</Text>
                <Text style={styles.subTitle}>Enable both layers of Security</Text>

                <Text style={styles.option}>First Layer Security Option</Text>
                <View style={styles.eachSecurity}>
                    <Text style={styles.text}>Face ID</Text>
                    <Switch
                        value={isFacialIDEnabled}
                        onValueChange={() => toggleAuth('facialId', isFacialIDEnabled, setIsFacialIDEnabled)}
                        trackColor={{ false: '#ffffff', true: '#ffffff' }}
                        thumbColor={isFacialIDEnabled ? '#767577' : '#f4f3f4'}
                    />
                </View>

                <Text style={styles.or}>Or</Text>

                <View style={styles.eachSecurity}>
                    <Text style={styles.text}>Finger ID</Text>
                    <Switch
                        value={isFingerIDEnabled}
                        onValueChange={() => toggleAuth('fingerprint', isFingerIDEnabled, setIsFingerIDEnabled)}
                        trackColor={{ false: '#ffffff', true: '#ffffff' }}
                        thumbColor={isFingerIDEnabled ? '#767577' : '#f4f3f4'}
                    />
                </View>

                <Text style={styles.option}>Second Layer Security Option</Text>
                <TouchableOpacity style={styles.eachSecurity} onPress={() => navigation.navigate('PinSettings')}>
                    <Text style={styles.text}>Pin</Text>
                    <Feather name="chevron-right" size={20} color='#111' />
                </TouchableOpacity>
                <Text style={styles.or}>Or</Text>
                <TouchableOpacity style={styles.eachSecurity} onPress={() => navigation.navigate('PassphraseScreen')}>
                    <Text style={styles.text}>Passphrase</Text>
                    <Feather name="chevron-right" size={20} color='#111' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.password} onPress={() => navigation.navigate('PasswordCurrent')}>
                    <Text style={styles.text}>Change Password</Text>
                    <Feather name="chevron-right" size={20} color='#111' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.devices} onPress={() => navigation.navigate('DevicesList')}>
                    <Entypo name="mobile" size={20} color='#767676' />
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text style={{ color: '#0e0e0e', fontSize: 14 }}>Devices</Text>
                        <Text style={{ color: '#3c3c3c', fontSize: 12 }}>List of devices where you're logged in</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        paddingVertical: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0e0e0e',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3c3c3c',
        paddingVertical: 10,
    },
    option: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8a8a8a',
        paddingVertical: 10,
    },
    eachSecurity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    password: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 25,
        borderColor: '#dadada',
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    or: {
        color: '#8a8a8a',
        fontSize: 14,
    },
    devices: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
});
