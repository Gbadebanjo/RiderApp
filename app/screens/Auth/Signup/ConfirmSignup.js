import React, {useRef, useState} from 'react';
import otpApi from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from 'yup';
import BackButton from '../../../components/BackButton';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .required('Enter the 6-digit code'),
});

const CELL_COUNT = 6;

export default function ConfirmSignup({navigation, route}) {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    const handleVerify = async (values, {resetForm}) => {
      setLoading(true);
      const response = await otpApi.verifyOtp(email, values.code);
      Keyboard.dismiss();
      if (!response.ok) {
        setLoading(false);
        Toast.show({
          type: 'error', 
          text1: response.data.message,
        });
      return setErrorMessage(response.data.message);
      }
      Toast.show({
        type: 'success',
        text1: response.data.message,
      });
      resetForm();
      navigation.navigate('UserDetails', { 
        email: email,
      });
    }

    const handleResend = async () => {
      setLoading(true);
      const response = await otpApi.getOtp(email);

      if (!response.ok) {
        setLoading(false);
        return alert(response.data.message);
      }
      setLoading(false);
      // console.log(response.data.message);
      return alert(response.data.message);
    }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <BackButton style={styles.Icon} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Centerlogo/>
      <Text style={styles.title}>Confirm 6-digit code</Text>
      <Text style={styles.subtitle}>Please check your email inbox or spam</Text>

      {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

      <Formik
        initialValues={{ code: '' }}
        validationSchema={validationSchema}
        onSubmit={handleVerify}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
             <CodeField
                ref={ref}
                {...props}
                value={values.code}
                onChangeText={handleChange('code')}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType=""
                textContentType="oneTimeCode"
                onSubmitEditing={handleSubmit} 
                renderCell={({ index, symbol, isFocused }) => (
                <Text
                    key={index}
                    style={[
                        styles.cell,
                        isFocused && styles.focusCell,
                        symbol && styles.completeCell,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}
                >
                    {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
                )}
                />
            {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
          </>
        )}
      </Formik>
        
        <View style={styles.lowerparts}>
            <Text style={styles.resendText}>I didn’t receive any code? 00:04</Text>

            <View style={styles.buttonContainer}>
               <TouchableOpacity>
                    <Text style={styles.resendCode}>Resend code</Text>
               </TouchableOpacity>
               <TouchableOpacity>
                    <Text style={styles.resendCode}>Send SMS</Text>
               </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  Icon: {
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  bigerrorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
  lowerparts:{
    marginTop: 80,
    },
  buttonContainer:{
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  flexSpacer: {
    flex: 1,
  },
  resendText:{
    textAlign: 'center',
  },
  resendCode:{
    fontWeight: '700',
  },
  codeFieldRoot: {
    marginTop: 70,
    width: '100%',
    alignSelf: 'center',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#CCCCCC',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000000',
  },
  completeCell: {
    borderColor: '#000000',
},
  inputText: {
    color: 'black', 
    fontSize: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#0000EE',
  },
});
