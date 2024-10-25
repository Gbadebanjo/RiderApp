import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import React, { useState, useEffect, useContext } from 'react'
import StyledButton from '../../components/StyledButton';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import { AppContext } from '../../context/AppContext';
import { generate } from 'random-words';
import { setAuthToken } from '../../api/client';
import passphraseApi from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generatePhrase = () => {
    const words = generate({ exactly: 5, join: " " });
    return words;
}

export default function PassphraseAutoGenerate({ navigation }) {
    const [generatedPassphrase, setGeneratedPassphrase] = useState('');
    const [inputValue, setInputValue] = useState('');
    const {  setUserDetails } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initialPassphrase = generatePhrase();
        setGeneratedPassphrase(initialPassphrase);
        setInputValue(initialPassphrase);
    }, []);

    const handleGeneratePress = () => {
        const newPassphrase = generatePhrase();
        setGeneratedPassphrase(newPassphrase);
        setInputValue(newPassphrase);
    };

    const handleSaveNCopy = async () => {
        try {
            // Send passphrase to the backend
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            setAuthToken(token);

            const response = await passphraseApi.updatePassphrase({ value: generatedPassphrase });
            console.log(response);
            if (!response.ok) {
                return Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data.message,
                });
            }
            Clipboard.setStringAsync(generatedPassphrase);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Passphrase copied to clipboard!',
            });
            setInputValue('');
            setUserDetails(response.data.rider);
            navigation.navigate('Security')
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Failed to save passphrase. Please try again.',
            });

        }
        setLoading(false);
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Passphrase Management</Text>
            <Text style={styles.description}>Passphrase is based on predefined criteria (e.g., number of words, inclusion of special characters and numbers), e.g., "blue-sky-apple-42"</Text>

            <Text style={styles.subtitle}>Generate Passphrase</Text>

            <View style={styles.mainContent}>
                <View style={styles.generateContainer}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        textAlign="center"
                        value={inputValue}
                        editable={false}
                    />
                    <StyledButton
                        title="Regenerate"
                        onPress={handleGeneratePress}
                        marginLeft={"30%"}
                        width={120}
                        height={42}
                        marginTop={30}
                        paddingVertical={10}
                        borderRadius={10}
                        fontSize={16}
                        backgroundColor={'#f5f5f5'}
                        TextColor={'#0e0e0e'}
                        borderColor={'#d0d0d0'}
                        borderWidth={1}
                    />
                    <StyledButton
                        title={loading ? <ActivityIndicator size="small" color="#fff" /> : "Save Passphrase"}
                        onPress={handleSaveNCopy}
                        width="100%"
                        height={52}
                        marginTop={20}
                        borderRadius={10}
                        fontSize={16}
                    />
                </View>
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0c0c0c',
        marginTop: 20,
        marginBottom: 10,
    },
    titleContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#3c3c3c',
        marginBottom: 30,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0c0c0c',
        marginBottom: 10,
    },
    generateText: {
        fontSize: 16,
        fontWeight: '500',
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
        gap: 50,
        marginTop: 20,
    },
});