import React, { useState, useEffect } from 'react';
import otpApi from './../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import InputField from '../../../components/InputField';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import OrSeparator from '../../../components/OrSeparator';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import zxcvbn from 'zxcvbn';
// const googleLogo = require('./../../../assets/GoogleIcon.png');
// const appleLogo = require('./../../../assets/AppleLogo.png');

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
    password: yup
    .string()
    .required('Enter your Password')
});

WebBrowser.maybeCompleteAuthSession();

const webClientId = '420976305973-75bg3b3umjrn7gt35hcvurarn9f5n47c.apps.googleusercontent.com'
const iosClientId = '420976305973-jjq52v3pt85p8a28hmono2mm0u879ii8.apps.googleusercontent.com'
const androidClientId = '420976305973-q9sik4t9l4k87bmnd2tduo518iaq5t5l.apps.googleusercontent.com'

export default function CreateAccount({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

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


    const handleSubmit = async (values) => {

      // setLoading(true);
      // const res = await otpApi.post('/signup/email', { email: values.email });
  
      // setLoading(false);
      // if (res.ok) {
      //   alert('Account created successfully!');
        navigation.navigate('ConfirmSignup', { email: values.email });
      // } else {
      //   alert('Failed to create account.');
      // }
    };

    const handlePasswordChange = (password) => {
      const result = zxcvbn(password);
      setPasswordStrength(result);
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Centerlogo />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create an Account</Text>

      <Formik
        initialValues={{ email: '', password: ''  }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <InputField
              label="Email"
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
            {/* {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>} */}

            {passwordStrength && (
            <Text style={styles.passwordStrength}>
              Password Strength: {passwordStrength.score}/4 - {passwordStrength.feedback.suggestions.join(' ')}
            </Text>
          )}

            <InputField
              label="Confirm Password"
              placeholder="user@rydepro.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="next"
              width="100%"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
              errorMessage={errors.email}
              showPasswordToggle={true}
            />
            <StyledButton
              title={
                loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  'Continue'
                )
              }
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
              width="100%"
              height={53}
              paddingVertical={10}
              marginTop={40}
              backgroundColor="#212121"
              borderWidth={2}
              TextColor="#fff"
              borderRadius={20}
            />
          </>
        )}
      </Formik>
{/* 
      <View style={styles.socialsLogo}>
        <SocialLogo text="Google" onPress={() => promptAsync()} logo={googleLogo} />
        <SocialLogo text="Apple" onPress={() => alert('Login with Apple')} logo={appleLogo} />
      </View>

      <OrSeparator />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity> */}

      {/* <Text style={styles.proceedText}>
        By proceeding, you agree to RYDEPRO’s
        <Text style={styles.linkText} onPress={() => alert('Terms clicked')}> Terms,</Text>
        <Text style={styles.linkText} onPress={() => alert('Privacy Notice clicked')}> Privacy </Text>
        Notice and can unsubscribe by emailing
        <Text style={styles.boldText} onPress={() => alert('Privacy Notice clicked')}> "Unsubscribe" </Text>
      </Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  socialsLogo: {
    flexDirection: 'row',
    gap: 0,
    marginTop: 30,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  proceedText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
    width: '100%',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  flexSpacer: {
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#0000EE',
  },
});
