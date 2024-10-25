import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import passphraseApi from '../../api/auth';
import { setAuthToken } from '../../api/client';

export default function PinSettings({ navigation, route }) {
    const { userDetails, setUserDetails } = useContext(AppContext);

    // Check if pin exists from userDetails
    const pinExists = userDetails?.authsEnabled?.includes('pin');
    const [isPinEnabled, setIsPinEnabled] = useState(pinExists);

    useEffect(() => {
        setIsPinEnabled(pinExists);
    }, [pinExists]);

    // Handle switch toggle
    const handleToggleSwitch = () => {
        if (isPinEnabled) {
            // If toggling off
            navigation.navigate('SettingsPasswordScreen', { originScreen: 'PinSettings', action: 'disable' });
        } else {
            // If toggling on
            setIsPinEnabled(true);
            navigation.navigate('CreatePinScreen', { action: 'create' });
        }
    };

    useEffect(() => {
        if (route.params?.success && route.params?.action === 'disable') {
            handleDisablePin();
        }
    }
        , [route.params?.success]);


    const handleDisablePin = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setAuthToken(token);

            const response = await passphraseApi.updatePin({ disable: true });
            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data.message,
                });
                return;
            }

            Toast.show({
                type: 'success',
                text1: 'Passphrase disabled successfully',
            });

            setUserDetails(response.data.rider);  // Update the user details
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to disable passphrase',
                text2: 'Please try again.',
            });
        }
    };

    // Handle navigation to change pin or create pin based on existence
    const handlePinNavigation = () => {
        if (pinExists) {
            navigation.navigate('PinPasswordScreen', { action: 'change' });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={24} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Pin Management</Text>

            <View style={styles.toggle}>
                <Text>Pin</Text>
                <Switch
                    value={isPinEnabled}
                    onValueChange={handleToggleSwitch}
                    trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                    thumbColor={isPinEnabled ? '#111' : '#8a8a8a'}
                />
            </View>

            <TouchableOpacity style={styles.pinTouch}
                onPress={isPinEnabled ? handlePinNavigation : null} // Only allow press if pin is enabled
                disabled={!isPinEnabled} // Disable touch if pin is not enabled
            >
                <Text style={[styles.text, { color: isPinEnabled ? '#000' : '#8a8a8a' }]}>
                    {pinExists ? 'Change Pin' : 'Create Pin'}
                </Text>
                <Feather name="chevron-right" size={20} color='#8a8a8a' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 40,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0e0e0e',
        paddingHorizontal: 2,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
    },
    pinTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
