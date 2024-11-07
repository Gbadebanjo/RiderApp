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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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

GoogleSignin.configure({
  webClientId: "447373894859-p3qt639opm2c12b9o07la0r30amha66n.apps.googleusercontent.com",
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: "447373894859-38d2ev07f0obb5a3f6usf0ja8l6g4v81.apps.googleusercontent.com",
});

export default function CreateAccount({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const signUp = async () => {
    setNewLoading(true)
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const email = String(userInfo.data.user.email)
      const idToken = userInfo.data.idToken;

      const response = await otpApi.signupWithGoogle(email, idToken);
      if (!response.ok) {
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message,
        });
      }
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.data.message,
      });
      setNewLoading(false)
      navigation.navigate('UserDetails', { email: email });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred',
      });
    }
    setNewLoading(false)
  };


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
      navigation.navigate('ConfirmSignup', { email: values.email, password: values.password, confirm: values.confirm });
      resetForm();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Account Creation Failed',
        text2: res.data.message,
      });
    }
  };

  if (newLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
              <TouchableOpacity onPress={() => navigation.navigate('RecoveryEmail')}>
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
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title}>Hi, Welcome!</Text>
          <Text style={styles.subtitle}>Please sign up to get started.</Text>
          <Formik
            initialValues={{ email: '', password: '', confirm: '' }}
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
          <TouchableOpacity style={styles.eachLogo} onPress={signUp}>
            <View style={styles.logo}>
              <Image source={GoogleLogo} />
            </View>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
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
