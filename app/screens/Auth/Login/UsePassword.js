import React, { useState, useContext } from 'react';
import passwordApi from './../../../api/auth'
import { StyleSheet, ScrollView, Text, View, StatusBar, ActivityIndicator, Keyboard, TouchableOpacity, Platform, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../context/AppContext';
import StyledButton from '../../../components/StyledButton';
import InputField from '../../../components/InputField';
import Centerlogo from '../../../components/centerlogo';
import Separator from '../../../components/OrSeparator';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import AppleLogo from '../../../assets/AppleLogo.png';
import GoogleLogo from '../../../assets/GoogleIcon.png';
import { Formik } from 'formik';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as yup from 'yup';
import zxcvbn from 'zxcvbn';

const validationSchema = yup.object().shape({
  password: yup.string()
    .required()
    .min(8)
    .test('uppercase', 'Password must contain a Uppercase', value =>
      /^(?=.*[A-Z]).+$/.test(value),
    )
    .test('lowercase', 'Password must contain a Lowercase', value =>
      /^(?=.*[a-z]).+$/.test(value),
    )
    .test('number', 'Password must contain a Number', value =>
      /^(?=.*\d).+$/.test(value),
    )
    .test(
      'non-alphabet',
      'Password must contain a Non-alphabet character',
      value => /^(?=.*[^a-zA-Z0-9]).+$/.test(value),
    )
    .label('Password'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function UsePassword({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const { userDetails, setUserDetails } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const { email, password } = values;

    const getLocation= await AsyncStorage.getItem('userLocation');
    const stringLocation = JSON.parse(getLocation);
    const location = {
      long: stringLocation.longitude,
      lat: stringLocation.latitude,
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

    const response = await passwordApi.loginWithPassword(email, password, deviceInfo, location);
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
    await AsyncStorage.setItem('email', email);
    setUserDetails(response.data.rider);
      setLoading(false);
      resetForm();
     return navigation.navigate('SettingHome');
  }

  const handlePasswordChange = (password) => {
    const result = zxcvbn(password);
    setPasswordStrength(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
       <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View style={styles.maincontent}>
        <View style={styles.topcontent}>
          <Centerlogo logoWidth='100%' logoHeight={80} />
                      <TouchableOpacity onPress={toggleModal} style={styles.dotsButton}>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>      

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
                animationType="fade"
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={()=> navigation.navigate('RecoveryEmail')}>
                      <Text style={styles.modalItem}>Account Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Faq</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
        </View>

      <Text style={styles.title}>Hi, Welcome back!</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <Formik
        initialValues={{ email: '', password: ''  }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <InputField
              label="Email Address"
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="email"
              returnKeyType="next"
              width="100%"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
              errorMessage={errors.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <InputField
              label="Password"
              placeholder=""
              keyboardType="password"
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="next"
              width="100%"
              onChangeText={(text) => {
                handleChange('password')(text);
                handlePasswordChange(text);
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              error={touched.password && errors.password}
              errorMessage={errors.password}
              showPasswordToggle={true}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <StyledButton
              title={
                loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  'Sign in'
                )
              }
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              width="100%"
              height={53}
              paddingVertical={10}
              marginTop={20}
              backgroundColor="#212121"
              borderWidth={2}
              TextColor="#fff"
              borderRadius={10}
            />
          </>
        )}
      </Formik>

      </View>

      <Separator />
      
        <View style={styles.socialsLogo}>
          <View style={styles.eachLogo}>
            <View style={styles.logo}>
              <Image source={GoogleLogo} />
            </View>
            <Text style={styles.socialText}>Google</Text>
          </View>
          <View style={styles.eachLogo}>
            <View style={styles.logo}>
              <Image source={AppleLogo} />
            </View>
            <Text style={styles.socialText}>Apple</Text>
          </View>
      </View>

        <View style={styles.three}>
            <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')}>
              <Text style={styles.signupText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupText}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.privacyText}>Privacy</Text>
            </TouchableOpacity>
        </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  maincontent: {
    // width: '100%', 
  },
  scrollViewContent: {
    width: '100%',
  },
  topcontent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  lastText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
    width: '100%',
    marginBottom: 10,
  },
  dotsButton: {
    position: 'absolute',
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 20,
  },
  modalItem: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  three: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  signupText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    borderRightWidth: 2,
    borderRightColor: '#D0D0D0',
    paddingHorizontal: 10,
  },
  privacyText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    paddingHorizontal: 10,
  },
  socialsLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: '8%',
  },
  socialText: {
    fontSize: 16,
    color: '#0E0E0E',
    fontWeight: '700'
  },
  logo: {
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 15,
    borderRadius: 50,
  },
  eachLogo: {
    alignItems: 'center',
  },
    cancel: {
       marginTop: '10%',
    },
});