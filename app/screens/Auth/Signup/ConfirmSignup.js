import React, {useRef, useState, useEffect} from 'react';
import otpApi from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from 'yup';
import {MaterialIcons } from '@expo/vector-icons';

import BackButton from '../../../components/BackButton';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .required('Enter the 6-digit code'),
});

const CELL_COUNT = 6;

export default function ConfirmSignup({navigation, route}) {
    const { email, password, confirm } = route.params;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [countdown, setCountdown] = useState(180);

    const handleVerify = async (values, {resetForm}) => {
      setLoading(true);
      const response = await otpApi.verifyOtp(email, values.code);
      Keyboard.dismiss();
      if (!response.ok) {
        setLoading(false);
        return Toast.show({
          type: 'error', 
          text1: response.data.message,
        });
      }
      Toast.show({
        type: 'success',
        text1: response.data.message,
      });
      resetForm();
      return navigation.navigate('UserDetails', { 
        email: email,
      });
    }

    const handleResend = async () => {
      setLoading(true);
      const res = await otpApi.requestOtp(email, password, confirm);
  
      setLoading(false);
      if (res.ok) {
        setCountdown(180);
        Toast.show({
          type: 'success',
          text2: res.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text2: res.data.message,
        });
      }
    }

    useEffect(() => {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [countdown]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View>
              <Centerlogo logoWidth='100%' logoHeight={80} />
              <Text style={styles.title}>Enter 6-digit code</Text>
              <Text style={styles.subtitle}>Please check your email inbox or spam</Text>

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
                        keyboardType='name-phone-pad'
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

                      {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}
                  </>
                )}
              </Formik>
          
              <View style={styles.lowerparts}>
                <Text style={styles.resendText}>I didn’t receive any code? {formatTime(countdown)}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity disabled={countdown > 0} onPress={handleResend}>
                      <Text style={[styles.resendCode, countdown > 0 && styles.disabledText]}>Resend code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled>
                          <Text style={styles.disabledText}>Send SMS</Text>
                    </TouchableOpacity>
                  </View>
              </View>            
            </View>
            
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16, }} onPress={()=> navigation.goBack()}>
                <MaterialIcons name="keyboard-backspace" size={24} color='#CCCCCC'/>
                <Text style={{color:'#CCCCCC'}}> Back</Text>
              </TouchableOpacity>
          </View> 
      </ScrollView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 15,
  },
  Icon: {
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 30,
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
    marginTop: 50,
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
  disabledText: {
    color: 'gray', 
  },
});
