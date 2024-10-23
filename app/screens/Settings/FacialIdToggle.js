import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Switch, Dimensions, Modal, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import SecurityModal from '../../components/SecurityModal';
import { AppContext } from '../../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import facialIdApi from '../../api/auth';
import Toast from 'react-native-toast-message';
import { setAuthToken } from '../../api/client';

const face = require('../../assets/Face.png');

export default function FacialIdToggle({ navigation, route }) {
  const { userDetails, setUserDetails } = useContext(AppContext);
  const [isFaceIDSupported, setIsFaceIDSupported] = useState(false);
  const [isFacialIDEnabled, setIsFacialIDEnabled] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  let newValue;

  useEffect(() => {
    if (userDetails.authsEnabled.includes('facialId')) {
      setIsFacialIDEnabled(true);
    }
  }, [userDetails.authsEnabled]);

  const toggleFacialID = () => {
    setIsFacialIDEnabled((prevState) => !prevState);
    if (isFacialIDEnabled) {
      // When the toggle is ON and switching it OFF, route to password screen to confirm
      navigation.navigate('SettingsPasswordScreen', { originScreen: 'FacialIdToggle', action: 'disable' });
    } else {
      navigation.navigate('SettingsPasswordScreen', { originScreen: 'FacialIdToggle', action: 'enable' });
    }
  };

  useEffect(() => {
    if (route.params?.success) {
      const action = route.params?.action;
      // console.log('Action:', action);
      if (action === 'enable') {
        setModalActive(true);  
      } else {
        SendDetails()
      }
    }
  }, [route.params?.success]);

  const SendDetails = async () => {
    isFacialIDEnabled === false ? newValue = false : true;

    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);

    try {
      const response = await facialIdApi.updateFacialId({ value: newValue })
      if (!response.ok) {
        return Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: response.data?.message || 'Something went wrong',
        });
      }
      Toast.show({
        type: 'success',
        text1: 'FacialId Updated',
      });
      setUserDetails(response.data.rider)
      navigation.navigate('Security');
    }
    catch (error) {
      console.error('An error occurred:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again.',
      });
    }
  }

  const handleModalClose = () => {
    setModalActive(false);
  };


  useEffect(() => {
    if (isFacialIDEnabled) {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height * 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isFacialIDEnabled]);


  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsFaceIDSupported(compatible);
    })();
  }, []);

  const handleFacialIDAuth = async () => {
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
      fallbackLabel: 'Enter Password',
    });

    if (success) {
      SendDetails()
      setModalActive(false);
    } else {
      return Toast.show({
        type: 'error',
        text1: 'FacialID cannot be registered',
      });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="#111111" />
      <View style={styles.titleContainer} >
        <Ionicons name="arrow-back" size={24} color='#fff'
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Security</Text>
      </View>
      <View style={styles.securityOptions}>
        <Text style={styles.subtitle}>FaceID Management</Text>

        <View style={styles.eachSecurity}>
          <Text style={styles.text}>Facial Identification</Text>
          <Switch
            value={isFacialIDEnabled}
            onValueChange={toggleFacialID}
            trackColor={{ false: '#ffffff', true: '#ffffff' }}
            thumbColor={isFacialIDEnabled ? '#767577' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </View>


      <Modal
        transparent={true}
        visible={modalActive}
        animationType="none"
        onRequestClose={handleModalClose}
      >
        <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalContent}>
            <View style={styles.topSection}>
              <Text style={styles.modalTitle}>Verify It's You</Text>
              <Text style={styles.modalText}>You can use face authentication to secure your accounts</Text>
              <Image source={face} style={styles.logo} />
              <Text style={styles.modalCenterText}>Tap Confirm to complete</Text>
            </View>

            <View style={styles.bottomSection}>
              <TouchableOpacity style={styles.cancelbutton} onPress={toggleFacialID}>
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmbutton} onPress={handleFacialIDAuth}>
                <Text style={styles.buttonText2}>Confirm</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Animated.View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingHorizontal: 20,
    width: '100%',
  },
  titleContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF'
  },
  securityOptions: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#767676',
    marginBottom: 10,
  },
  eachSecurity: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  fingerprint: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContent: {
    width: '90%',
    // flexDirection: 'column',
    marginTop: 70,
    justifyContent: 'space-between',
    gap: 70
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCenterText: {
    fontSize: 12,
    textAlign: 'center',
  },
  topSection: {
    // flex: 1,
  },
  logo: {
    width: '30%',
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  bottomSection: {
    top: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },
  cancelbutton: {
    padding: 10,
    width: '25%',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
  },
  confirmbutton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    width: '25%',
    justifyContent: 'center'
  },
  buttonText1: {
    color: '#000',
    fontSize: 14,
    textAlign: 'start',
  },
  buttonText2: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});