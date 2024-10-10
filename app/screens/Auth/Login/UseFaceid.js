import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import React , { useEffect, useState, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import facialIDApi from '../../../api/auth'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { AppContext } from '../../../context/AppContext';
import SocialLogo from '../../../components/SocialLogo';
import StyledButton from '../../../components/StyledButton';
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../../components/BackButton';


export default function UseFaceid({navigation}) {
  const [isFacialIDSupported, setIsFacialIdSupported] = useState(false);  
  const { userDetails, setUserDetails } = useContext(AppContext);
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsFacialIdSupported(compatible);
    })();
  }, []);

  const handleFacialIDAuth = async () => {
    const savedFaceId = await LocalAuthentication.isEnrolledAsync();
    if (!savedFaceId) {
      Toast.show({
        type: 'error',
        text1: 'Biometric record not found',
        text2: 'Please ensure you have set up biometrics in your device settings',
      });
    }
  
    const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (!biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return Toast.show({
        type: 'error',
        text1: 'Facial recognition not supported',
        text2: 'Please ensure your device supports Facial recognition authentication.',
      });
    }
  
    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use facial recognition to access your account',
      // fallbackLabel: 'Enter Password',
      // disableDeviceFallback: true,
    });
  
    if (success) {   
      const faceidToken = await AsyncStorage.getItem('bioToken');
      const email = await AsyncStorage.getItem('email');
      if (!email) {
        return Toast.show({
          type: 'error', 
          text1: 'Please login with your email and password to acesss your account',
        });
      }

      if (!faceidToken) {
        return Toast.show({
          type: 'error', 
          text1: 'You have not setup FaceID Authentication on your account'
        });
      } 
      
      let deviceId;

      if (Platform.OS === 'android') {
        deviceId = await Application.getAndroidId();
      } else if (Platform.OS === 'ios') {
        deviceId = await Application.getIosIdForVendorAsync();
      }
  
      const deviceInfo = {
         deviceType: Device.osName,
         deviceName: await Device.deviceName,
         deviceId: deviceId,
    }
      const response = await facialIDApi.loginWithPincode(email, faceidToken, deviceInfo);
      if (!response.ok) {
        setLoading(false);
        const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
        return Toast.show({
          type: 'error', 
          text1: errorMessage,
        });
      }
      Toast.show({
          type: 'success',
          text1: response.data.message,
      });
      await AsyncStorage.setItem('userToken', response.data.token);
      await AsyncStorage.setItem('bioToken', response.data.bioToken);
      setUserDetails(response.data.rider);
  
      setLoading(false);
      return navigation.navigate('WelcomeHome');
    } else {
      return Toast.show({
        type: 'error', 
        text1: "Authentication Failed",
      });
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
