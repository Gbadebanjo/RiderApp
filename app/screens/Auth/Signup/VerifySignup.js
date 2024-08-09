// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import { Formik } from 'formik';
import OrSeparator from '../../../components/OrSeparator';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from 'yup';
import BackButton from '../../../components/BackButton';
const googleLogo = require('./../../../assets/GoogleIcon.png');
const appleLogo = require('./../../../assets/AppleLogo.png');

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .required('Enter the 6-digit code'),
});

const CELL_COUNT = 6;

export default function FirstScreen({navigation}) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <BackButton style={styles.Icon} />
      <Centerlogo/>
      <Text style={styles.title}>Enter the 6-digit code</Text>
      <Text style={styles.subtitle}>Please check your email inbox or spam</Text>

      <Formik
        initialValues={{ code: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
        navigation.navigate('SetPassword');
        }}
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
                // keyboardType="number-pad"
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

          <View style={styles.socialsLogo}>
            <SocialLogo text="Google" logo={googleLogo} />
            <SocialLogo text="Apple" logo={appleLogo}/>
          </View>

          <OrSeparator />
     
      <TouchableOpacity onPress={() => alert('Logged In User')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.flexSpacer} />
        
        <View>
            <Text style={styles.resendText}>I didn’t receive any code? 00.04</Text>

            <View style={styles.buttonContainer}>
                <StyledButton
                    title="Resend Code"
                    // onPress={alert('Resend Code')}
                    width="50%"
                    height={40}
                    fontSize={11}
                    paddingVertical={10}
                    marginTop={20}
                    backgroundColor="#D3D3D3"
                    TextColor="#fff"
                />

                <StyledButton
                    title="Send SMS"
                    // onPress={alert('Send SMS')}
                    width="50%"
                    height={40}
                    fontSize={13}
                    paddingVertical={10}
                    marginTop={20}
                    backgroundColor="#D3D3D3"
                    TextColor="#fff"
            />
            </View>
        </View>

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
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  Icon: {
    alignSelf: 'flex-start',
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  socialsLogo: {
    flexDirection: 'row',
    gap: 30,
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
  buttonContainer:{
    width: '70%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
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
  codeFieldRoot: {
    marginTop: 40,
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
});
