import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import React , {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import SocialLogo from '../../../components/SocialLogo';
import StyledButton from '../../../components/StyledButton';
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../../components/BackButton';


export default function UseFaceid({navigation}) {
  const [isFacialIDSupported, setIsFacialIdSupported] = useState(false);  
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsFacialIdSupported(compatible);
    })();
  }, []);

  const handleFacialIDAuth = async () => {
    const savedFaceId = await LocalAuthentication.isEnrolledAsync();
    if (!savedFaceId) {
      return Alert.alert(
        'FaceId record not found',
        'Please ensure you have set up FaceId  in your device settings.',
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
      // fallbackLabel: 'Enter Password',
      // disableDeviceFallback: true,
    });


  
    if (success) {      
      // retrieve biometricToken from asyncStorage
      // const facialToken = await AsyncStorage.getItem('facialToken');
      // if (!facialToken) {
      //   Alert.alert('Error', 'You have not setup Face ID Authentication on your account. Access your account through other authentication methods', [{ text: 'OK' }])
      //   return;
      // }
      // const loginMethod = "facial";
  
      // // send request to login with face ID authentication
      // const response = await api.biometricsLogin(facialToken, loginMethod);
      // if (!response.ok) {
      //   const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
      //   return Alert.alert('Error', errorMessage, [
      //       {
      //         text: 'OK',
      //       },
      //   ]);
      // }
  
      // // save the biometricToken and token received in asyncStorage
      // await AsyncStorage.setItem('facialToken', response.data.data.facialToken);
      // await AsyncStorage.setItem('token', response.data.data.token);
  
      // return Alert.alert('Success', response.data.data.message, [
      return Alert.alert('Success', 'Login Successful', [
        {
          text: 'OK',
          // onPress: () => navigation.navigate('MenuLanding'), 
        },
      ]);
    } else {
      Alert.alert('Authentication Failed', error, [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <BackButton style={styles.Icon} />
        <View style={styles.maincontent}>
            <SocialLogo logo={<AntDesign name="scan1" size={40} color='#fff' style={styles.logo}/>} containerWidth='20%'/>
            <Text style={styles.title}>Face Recognition</Text>
            <Text style={styles.subtitle}>Scan Your Face to verify your account</Text>
        </View>


      <StyledButton
            title="Continue"
            onPress={() => handleFacialIDAuth()}
            width="88%"
            height={53}
            fontSize={16}
            paddingVertical={10}
            marginTop={0}
            backgroundColor="#000"
            borderWidth={1}
            borderRadius={30}
            borderColor='rgba(17, 17, 17, 0.1)'
            TextColor="#fff"
             />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingBottom: 30,
    },
    Icon: {
        alignSelf: 'flex-start',
        paddingLeft: '5%',
        marginTop: 20,
    },
    maincontent: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: '50%'
      },
    logo: {
        backgroundColor: '#000',
        borderRadius: 100,
        borderColor: '#000',
        paddingLeft: '22%',
        width: '100%',
        paddingVertical: '23%', 
      },
      title: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      subtitle: {
        marginTop: 30,
        fontSize: 14,
        textAlign: 'center',
      },
})
