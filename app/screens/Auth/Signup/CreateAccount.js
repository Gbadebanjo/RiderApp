import React, { useState, useEffect } from 'react';
import otpApi from './../../../api/auth'
import { StyleSheet, ScrollView, Text, StatusBar, ActivityIndicator, Keyboard, View, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import InputField from '../../../components/InputField';
import Centerlogo from '../../../components/centerlogo';
import Toast from 'react-native-toast-message';
import Separator from '../../../components/OrSeparator';
import { Formik } from 'formik';
import { Entypo, Feather } from '@expo/vector-icons';
import * as yup from 'yup';
import * as WebBrowser from 'expo-web-browser';
import AppleLogo from '../../../assets/AppleLogo.png';
import GoogleLogo from '../../../assets/GoogleIcon.png';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import zxcvbn from 'zxcvbn';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
    password: yup
        .string()
        .required('Enter your Password')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

WebBrowser.maybeCompleteAuthSession();

const webClientId = '420976305973-75bg3b3umjrn7gt35hcvurarn9f5n47c.apps.googleusercontent.com'
const iosClientId = '420976305973-jjq52v3pt85p8a28hmono2mm0u879ii8.apps.googleusercontent.com'
const androidClientId = '420976305973-q9sik4t9l4k87bmnd2tduo518iaq5t5l.apps.googleusercontent.com'

export default function CreateAccount({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   webClientId,
  //   iosClientId,
  //   androidClientId,
  // });

  // const getUserProfile = async (token) => {
  //   if(!token) return;
  //   try{
  //     const response = await fetch("https://www.googleapis.com/auth/userinfo/v2/userinfo", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const user = await response.json();
  //     return user;
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // };

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);
  //   const { type, authentication } = response || {};
  //   if (type === 'success' && authentication.accessToken) {
  //     const userInfo = await getUserProfile(authentication.accessToken);
  //     if (userInfo) {
  //       console.log('user info', userInfo);
  //       const { email } = userInfo;

  //       const res = await otpApi.post('signup/google', { email });
  //       setLoading(false);

  //       if (res.ok) {
  //         alert(res.data.message);
  //         navigation.navigate('VerifySignup', { email });
  //       } else {
  //         alert('Failed to create account');
  //       }
  //     } else {
  //       alert('Google Signin failed');
  //       setLoading(false);
  //     }
  //   };
  // };

       
    // useEffect(() => {
    //   if (response) handleGoogleSignIn();
    // }, [response]);


  const handleSubmit = async (values, { resetForm }) => {
      const { email, password, confirm } = values;
      setLoading(true);
      const res = await otpApi.requestOtp(email, password, confirm);
  
      setLoading(false);
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Account Created Successfully',
          text2: res.data.message,
        });
        navigation.navigate('ConfirmSignup', { email: values.email, password: values.password, confirm: values.confirm});
          resetForm();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Account Creation Failed',
          text2: res.data.message,
        });
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.topContent}>
        <Centerlogo logoWidth='100%' logoHeight={80} />
            <TouchableOpacity onPress={toggleModal} style={styles.dotsButton}>
              <Entypo name="dots-three-horizontal" size={24} color="#909090" />
            </TouchableOpacity>      

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
                animationType="fade"
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Faq</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Account Recovery</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.title}>Hi, Welcome!</Text>
        <Text style={styles.subtitle}>Please sign up to get started.</Text>
        <Formik
          initialValues={{ email: '', password: '', confirm: ''  }}
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

            <InputField
              label="Password"
              placeholder=""
              keyboardType="password"
              autoCapitalize="none"
              textContentType='password'
              returnKeyType="next"
              width="100%"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              error={touched.password && errors.password}
              errorMessage={errors.password}
              showPasswordToggle={true}
            />
              
              <View style={styles.Instructioncontainer}>
                <Feather name="info" size={16} color="#111111" />
                <Text style={styles.passwordInstruction}>
                  Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, & 1 special character
                </Text>
              </View>


            <InputField
              label="Confirm Password"
              placeholder=""
              keyboardType="password"
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="next"
              width="100%"
              onChangeText={handleChange('confirm')}
              onBlur={handleBlur('confirm')}
              value={values.confirm}
              error={touched.confirm && errors.confirm}
              errorMessage={errors.confirm}
              showPasswordToggle={true}
            />

            <StyledButton
              title={
                loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  'Create Account'
                )
              }
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              width="100%"
              height={53}
              paddingVertical={10}
              marginTop={10}
              backgroundColor="#212121"
              borderWidth={2}
              TextColor="#FAF6F6"
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollViewContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  topContent: {
    width: '100%',
  },
  dotsButton: {
    position: 'absolute',
    right: 0,
  },
  modalOverlay: {
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
  title: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: '#0E0E0E',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#3C3C3C'
  },
  form: {
    marginTop: '10%',
    width: '100%',
  },
  eachLogo: {
    alignItems: 'center',
  },
  Instructioncontainer: {
    flexDirection: 'row',
    gap: 5,
    width: '90%'
  },
  passwordInstruction: {
    fontSize: 11,
  },
  socialsLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: '10%',
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
  three: {
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '10%',
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
});
