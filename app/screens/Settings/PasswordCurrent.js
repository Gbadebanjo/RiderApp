import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For the eye icon
import  passwordApi  from '../../api/auth';
import { setAuthToken } from '../../api/client';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PasswordCurrent ({ navigation }) {
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


  

    const handlePasswordSubmit = async () => {
        if (!password) {
          return Toast.show({
            type: 'error',
            text1: 'Password is required',
          });
        }
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        setAuthToken(token);
    
        try {
          const response = await passwordApi.confirmPassword(password);
          if (!response.ok) {
            setError(response.data.message);
            return Toast.show({
              type: 'error',
              text1: response.data.message,
            });
          }
          navigation.navigate('NewPassword');
        }
        catch (error) {
          setError('An error occurred. Please try again.');
          Toast.show({
            type: 'error',
            text1: 'An error occurred. Please try again.',
          });
        }
        setLoading(false);
      }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color='#111' />
                </TouchableOpacity>
            <Text style={styles.title}>Enter Current Password</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="********"
                    placeholderTextColor="#b0b0b0"
                
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.icon}>
                    <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={16} color="black" />
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
                <Text style={styles.buttonText}>{loading ? <ActivityIndicator size="small" color="#fff" /> : 'Next'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginVertical: 30,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 40,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#000',
        borderBottomWidth: 1, 
        borderRadius: 10, 
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: "auto",
        marginBottom: 30,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
      },
});

