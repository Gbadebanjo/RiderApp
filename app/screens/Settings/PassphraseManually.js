import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import React, { useState, useContext } from 'react';
import StyledButton from '../../components/StyledButton';
import Toast from 'react-native-toast-message';
import { AppContext } from '../../context/AppContext';
import { setAuthToken } from '../../api/client';
import passphraseApi from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

export default function PassphraseManually({ navigation }) {
    const [inputValue, setInputValue] = useState('');
    const { setUserDetails } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleSavePassphrase = async () => {
        if (inputValue.length < 5) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passphrase must be at least 5 characters.',
            });
            return;
        }

        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            setAuthToken(token);

            const response = await passphraseApi.updatePassphrase({ value: inputValue });
            if (!response.ok) {
                return Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data.message,
                });
            }
            Clipboard.setStringAsync(inputValue);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Passphrase copied to clipboard!',
            });
            setUserDetails(response.data.rider);
            navigation.navigate('Security');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to save passphrase. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Passphrase Management</Text>
            <Text style={styles.description}>Passphrase is based on predefined criteria (e.g., number of words, inclusion of special characters and numbers), e.g., "blue-sky-apple-42"</Text>

            <Text style={styles.subtitle}>Enter Passphrase</Text>            

            <View style={styles.mainContent}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    textAlign="center"
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Enter your passphrase"
                />
                <StyledButton
                    title={loading ? <ActivityIndicator size="small" color="#fff" /> : "Save Passphrase"}
                    onPress={handleSavePassphrase}
                    width="100%"
                    height={52}
                    marginTop={20}
                    borderRadius={10}
                    fontSize={16}
                />
            </View>
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
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0c0c0c',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#3c3c3c',
        marginBottom: 30,
        marginTop: 10,
    },
    textInput: {
        borderColor: '#AAB1BC',
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        padding: 17,
        color: '#000',
    },
    mainContent: {
        width: '100%',
        marginTop: 20,
    },
});
