import React, { useState, useEffect } from 'react';
import { authClient, setAuthToken } from '../../api/client';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../components/BackButton';
// import StyledButton from '../../components/StyledButton';
import { Entypo, Ionicons } from '@expo/vector-icons';

export default function Biometric({ navigation }) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
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
      promptMessage: 'Place your Finger to access your account',
      fallbackLabel: 'Enter Password',
    });

    if (success) {
      // retrieve token from asyncStorage and setAuth token
      const token = await AsyncStorage.getItem('token');
      console.log('token:', token);
      if (!token) {
        Alert.alert('Error', 'Authorization token not found.');
        return;
      }
      setAuthToken(token);

      // send request to enable biometric authentication
      const response = await authClient.put('/enable-biometric', { authToEnable: 'biometric' });
      console.log(response.data);
      if (!response.ok) {
        const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        return Alert.alert('Error', errorMessage, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Feedback'),
          },
        ]);
      }
      // console.log(response.data);
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
        <Text style={styles.title}>Biometric</Text>
        <TouchableOpacity
          style={styles.Icon}
          onPress={() => navigation.navigate('SettingToggle')}>
          <Entypo name="dots-three-vertical" size={18} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>Click below to setup your Biometric Authentication</Text>
      <View style={styles.mainContent}>

        <TouchableOpacity
          onPress={handleBiometricAuth}>
          <Ionicons name="finger-print" size={150} style={styles.fingerprint} />
        </TouchableOpacity>
        {/* <Text style={styles.logoText}>Biometric</Text> */}

        {/* <StyledButton
                    title="Update"
                    onPress={() => navigation.navigate('Feedback')}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    iconName="angle-right" 
                    /> */}
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
    marginTop: 30,
    fontWeight: '500',
    textAlign: 'center'
  },
  mainContent: {
    // flex: 1,
    width: '100%',
    // justifyContent: 'space-around',
    marginTop: 100
  },
  fingerprint: {
    alignSelf: 'center',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    alignSelf: 'center',
  },
});