import React, { useState, useEffect } from 'react';
import { authClient, setAuthToken } from '../../api/client';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import * as LocalAuthentication from 'expo-local-authentication';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';


export default function FacialID({navigation}) {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsBiometricSupported(compatible);
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
          // retrieve token from asyncStorage and setAuth token
          const token = await AsyncStorage.getItem('userToken');
          if (!token) {
            Alert.alert('Error', 'Authorization token not found.');
            return;
          }
          setAuthToken(token);
      
          // send request to enable biometric authentication
          const response = await authClient.put('/enable-biometric');
          if (!response.ok) {
            const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
            return Alert.alert('Error', errorMessage, [
                {
                  text: 'OK',
                   onPress: () => navigation.navigate('Feedback'), 
                },
            ]);
          }
      
          // save the biometricToken token received in asyncStorage
          await AsyncStorage.setItem('biometricToken', response.data.data.biometricToken);
      
          return Alert.alert('Success', response.data.data.message, [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Feedback'), 
            },
          ]);
        } else {
          Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Facial ID</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate('SettingToggle')}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Click below to setup your Face-ID Authentication</Text>  
            <View style={styles.mainContent}>

                <TouchableOpacity  
                        onPress={handleFacialIDAuth}>
                        <MaterialCommunityIcons name="face-recognition" size={150} style={styles.face}/>
                    </TouchableOpacity>
            </View>        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: '500',
        textAlign: 'center'
    },
    mainContent: {
        marginTop: 150,
    },
    logoText:{
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        alignSelf: 'center',
    },
    face: {
        alignSelf: 'center',
    },
});