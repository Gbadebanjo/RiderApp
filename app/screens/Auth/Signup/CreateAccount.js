// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import otpApi from './../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import InputField from '../../../components/InputField';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import OrSeparator from '../../../components/OrSeparator';
import { Formik } from 'formik';
import * as yup from 'yup';
const googleLogo = require('./../../../assets/GoogleIcon.png');
const appleLogo = require('./../../../assets/AppleLogo.png');

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
});

export default function CreateAccount({navigation}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(false);
    const response = await otpApi.getOtp(values.email);
    console.log(response.data)
    if (!response.ok) {
      setLoading(false);
      setError(true);
      return alert(response.data.message);
    }
    setLoading(false);
    alert(response.data.message);
    navigation.navigate('VerifySignup', { email: values.email });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Centerlogo/>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create an Account</Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          <InputField
            label="Email"
            placeholder="user@rydepro.com"
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
          <StyledButton
             title={
              loading ? (
                <ActivityIndicator color="#fff"/>
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
            iconName="angle-right" 
            />
          </>
        )}
      </Formik>

          <View style={styles.socialsLogo}>
            {/* <SocialLogo text="Email" onPress={()=> alert('Login with Email')} logo={<MaterialCommunityIcons name="email" size={30} color='#000000' />}/> */}
            <SocialLogo text="Google" onPress={()=> alert('Login with Google')} logo={googleLogo}/>
            <SocialLogo text="Apple" onPress={()=> alert('Login with Apple')} logo={appleLogo}/>
          </View>

        <OrSeparator/>
     
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.flexSpacer} />

      <Text style={styles.proceedText}>
        By proceeding, you agree to RYDEPRO’s  
        <Text style={styles.linkText} onPress={() => alert('Terms clicked')}> Terms,</Text>
        <Text style={styles.linkText} onPress={() => alert('Privacy Notice clicked')}> Privacy </Text> 
        Notice and can unsubscribe by emailing 
        <Text style={styles.boldText} onPress={() => alert('Privacy Notice clicked')}> "Unsubscribe" </Text>
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
    paddingHorizontal:30,
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    marginTop: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
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
  proceedText:{
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
