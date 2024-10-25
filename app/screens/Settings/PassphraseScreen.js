import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import passphraseApi from '../../api/auth';
import { setAuthToken } from '../../api/client';

export default function PassphraseScreen({ navigation, route }) {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [isPassphraseEnabled, setPassphraseEnabled] = useState(false);

    const passphraseExists = userDetails.authsEnabled?.includes('passphrase');

    useEffect(() => {
            setPassphraseEnabled(passphraseExists);
    }, [passphraseExists]);

    const handleToggleSwitch = () => {
        if (isPassphraseEnabled) {
            // If toggling off
            navigation.navigate('SettingsPasswordScreen', { originScreen: 'PassphraseScreen', action: 'disable' });
        } else {
            // If toggling on
            navigation.navigate('PassphraseCreateSelection');
        }
    }


    useEffect(() => {
        if (route.params?.success && route.params?.action === 'disable') {
            handleDisablePassphrase();
        }
    }
        , [route.params?.success]);


    const handleDisablePassphrase = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setAuthToken(token);

            const response = await passphraseApi.updatePassphrase({ disable: true });
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

    const handlePassphraseUpdate = () => {
        passphraseExists ? navigation.navigate('PassphraseUpdate') : '';
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Passphrase Management</Text>
            <View style={styles.toggle}>
                <Text>Passphrase</Text>
                <Switch
                    trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                    thumbColor={isPassphraseEnabled ? '#111' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleToggleSwitch}
                    value={isPassphraseEnabled}
                />
            </View>
            <TouchableOpacity onPress={handlePassphraseUpdate} style={styles.pinTouch}>
                <Text style={[styles.text, {color: passphraseExists ? '#111' : '#8a8a8a' }]} >{passphraseExists ? 'Update Passphrase'  : 'Create Passphrase'}</Text>
                <Feather name="chevron-right" size={20} color={passphraseExists ? '#111' : '#8a8a8a'} />
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
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0c0c0c',
        paddingHorizontal: 2,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    pinTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});