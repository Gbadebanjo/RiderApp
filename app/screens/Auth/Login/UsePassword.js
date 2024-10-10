import React, { useState, useContext } from 'react';
import passwordApi from './../../../api/auth'
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, Keyboard, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../context/AppContext';
import StyledButton from '../../../components/StyledButton';
import InputField from '../../../components/InputField';
import Centerlogo from '../../../components/centerlogo';
import BackButton from '../../../components/BackButton';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const { email, password } = values;

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

    const response = await passwordApi.loginWithPassword(email, password, deviceInfo);
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
    await AsyncStorage.setItem('email', email);
    setUserDetails(response.data.rider);
      setLoading(false);
      resetForm();
     return navigation.navigate('WelcomeHome');
  }

  const handlePasswordChange = (password) => {
    const result = zxcvbn(password);
    setPasswordStrength(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.maincontent}>
        <View style={styles.topcontent}>
          <BackButton style={styles.Icon} />
          <Centerlogo style={styles.logo}/>
        </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Sign In</Text>

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

            {/* {passwordStrength && (
            <Text style={styles.passwordStrength}>
              Password Strength: {passwordStrength.score}/4 - {passwordStrength.feedback.suggestions.join(' ')}
            </Text>
          )} */}

            <InputField
              label="Confirm Password"
              placeholder=""
              keyboardType="password"
              autoCapitalize="none"
              textContentType="password"
              returnKeyType="next"
              width="100%"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              showPasswordToggle={true}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

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
              marginTop={40}
              backgroundColor="#212121"
              borderWidth={2}
              TextColor="#fff"
              borderRadius={20}
            />
          </>
        )}
      </Formik>

      </View>

      <Text style={styles.lastText}>
        By proceeding, you agree to RYDEPRO’s 
          <Text style={{textDecorationLine: 'underline'}}> Terms, </Text>
          <Text style={{textDecorationLine: 'underline'}}> Privacy</Text>  Notice and can unsubscribe by emailing 
          <TouchableOpacity>
            <Text style={{fontWeight: '900'}}>
            "Unsubscribe"
            </Text>
          </TouchableOpacity>
        </Text>
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
    justifyContent: 'space-between'
  },
  maincontent: {
    width: '100%', 
},
  topcontent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    width: '20%',
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
  lastText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
    width: '100%',
    marginBottom: 10,
  }
});