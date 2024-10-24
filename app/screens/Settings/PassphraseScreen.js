import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import CreatePassphraseModal from '../../components/CreatePassphraseModal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import passphraseApi from '../../api/auth';
import { setAuthToken } from '../../api/client';

export default function PassphraseScreen({ navigation, route }) {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [isCreatePassphrase, setIsCreatePassphrase] = useState(false);
    const [isAnyAuthEnabled, setIsAnyAuthEnabled] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [isPassphraseModalVisible, setIsPassphraseModalVisible] = useState(false);

    const passphraseExists = userDetails.authsEnabled.includes('passphrase');

    useEffect(() => {
        const checkSuccess = async () => {
            if (route.params?.success === true) {
                console.log(route.params?.success);
                setIsPassphraseModalVisible(true); // Show the modal when successful
            }
        };

        checkSuccess(); // Call the async function
    }, [route.params?.success]);


    const closePassphraseModal = () => {
        setIsCreatePassphrase(false);
        setIsPassphraseModalVisible(false);
        // setIsAnyAuthEnabled(isCreatePin);
        setIsAnyAuthEnabled(false);
    };

    const handlePassphraseGenerated = async (generatedPassphrase) => {
        // console.log('Generated passphrase:', generatedPassphrase);
        const token = await AsyncStorage.getItem('userToken');
        setAuthToken(token);

        const response = await passphraseApi.updatePassphrase({ value: generatedPassphrase });
        if (!response.ok) {
            setIsPassphraseModalVisible(false);
            return Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.data.message,
            });
        }
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Passphrase created successfully',
        });
        setUserDetails(response.data.rider);
        setIsPassphraseModalVisible(false);
        navigation.navigate('Security')
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Passphrase Management</Text>
            <View style={styles.toggle}>
                <Text>Pin</Text>
                <Switch
                    // value={isPinEnabled}
                    // onValueChange={handleToggleSwitch}
                    trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                    // thumbColor={isPinEnabled ? '#111' : '#8a8a8a'}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsPasswordScreen', { originScreen: 'PassphraseScreen' })} style={styles.pinTouch}>
                <Text style={styles.text} >{passphraseExists ? 'Update  Passphrase' : 'Create Passphrase'}</Text>
                <Feather name="chevron-right" size={20} color='#8a8a8a' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <CreatePassphraseModal
                isVisible={isPassphraseModalVisible}
                onClose={closePassphraseModal}
                navigation={navigation}
                onPassphraseGenerated={handlePassphraseGenerated}
            />
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