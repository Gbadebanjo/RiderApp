// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Centerlogo/>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create an Account</Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // navigation.navigate('VerifySignup', { email: values.email });
          navigation.navigate('UserDetails', { email: values.email });
        }}
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
            // marginLeft={1}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={touched.email && errors.email}
            errorMessage={errors.email}
          />
          <StyledButton
            title="Continue"
            onPress={handleSubmit}
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
            <SocialLogo text="Email" onPress={()=> alert('Login with Email')} logo={<MaterialCommunityIcons name="email" size={30} color='#000000' />}/>
            <SocialLogo text="Google" onPress={()=> alert('Login with Google')} logo={googleLogo}/>
            <SocialLogo text="Apple" onPress={()=> alert('Login with Apple')} logo={appleLogo}/>
          </View>

        <OrSeparator/>
     
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.flexSpacer} />

      <Text style={styles.proceedText}>
        By proceeding, you agree to RYDEPRO’s Terms, Privacy Notice and can unsubscribe by emailing 
        <Text style={styles.boldText}> "Unsubscribe" </Text>
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
    // marginLeft: '10%',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
    alignSelf: 'flex-start',
    // marginLeft: '10%',
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
    // marginLeft: '10%',
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
});
