// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import InputField from '../../../components/InputField';
import SelectInput from '../../../components/SelectInput';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import BackButton from '../../../components/BackButton';
const googleLogo = require('./../../../assets/GoogleIcon.png');
const appleLogo = require('./../../../assets/AppleLogo.png');

const validationSchema = yup.object().shape({
    accountType: yup.string().required('Account Type is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    displayName: yup.string().required('Display Name is required'),
    accessibility: yup.string().optional(),
    email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
    phoneNumber: yup.string().required('Phone Number required'),
    referralCode: yup.string().optional(),
});

export default function UserDetails({navigation, route}) {
    const { email } = route.params;
    const [value, setValue] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const phoneInputRef = useRef(null);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />
        <Centerlogo align="left"/>

      <Formik
        initialValues={{
             accountType: 'Individual',
             firstName: '',
             lastName: '',
             displayName: '',
             accessibility: '',
             email: email,
             phoneNumber: '',
             referralCode: '',
            }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
        navigation.navigate('ResidencyLocation');
        // alert('Details updated');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <InputField
                label="Account Type"
                placeholder=""
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('accountType')}
                onBlur={handleBlur('accountType')}
                value={"Individual"}
                error={touched.accountType && errors.accountType}
                errorMessage={errors.accountType}
                showPasswordToggle={false}
            />

            <InputField
                label="First Name"
                placeholder="John"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                error={touched.firstName && errors.firstName}
                errorMessage={errors.firstName}
                showPasswordToggle={false}
            />

            <InputField
                label="Last Name"
                placeholder="John"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                error={touched.lastName && errors.lastName}
                errorMessage={errors.lastName}
                showPasswordToggle={false}
            />

            <InputField
                label="Display Name (Alias)"
                placeholder="John"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                value={values.displayName}
                error={touched.displayName && errors.displayName}
                errorMessage={errors.displayName}
                showPasswordToggle={false}
            />

            <SelectInput
                label="Accessibility (Optional)"
                items={[
                    { label: 'Service Dogs', value: 'serviceDogs' },
                    { label: 'Wheel Chair', value: 'wheelChair' },
                    { label: 'Elderly', value: 'elderly' },
                    { label: 'Others', value: 'others' },
                ]}
                placeholder={{ label: 'Accessibility (Optional)', value: null }}
                onValueChange={handleChange('accessibility')}
                value={values.accessibility}
                width="100%"
                error={errors.accessibility}
            />

            <InputField
                label="Email Address"
                placeholder="rydapro@gmail.com"
                autoCapitalize="none"
                textContentType="email"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={email}
                error={touched.email && errors.email}
                errorMessage={errors.email}
                showPasswordToggle={false}
            />

            <Text style={styles.label}>Phone Number</Text>
                <View style={styles.phoneContainer}>
                    <PhoneInput
                    ref={phoneInputRef}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    onChangeText={handleChange('phoneNumber')}
                    containerStyle={[
                        styles.phoneFlagContainer,
                        isFocused && styles.focusedPhoneFlagContainer,
                    ]}
                    textContainerStyle={styles.phoneInputTextContainer}
                    withDarkTheme
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={values.phoneNumber}
                    error={touched.phoneNumber && errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    />
                </View>

            <InputField
                label="Referral Code (optional)"
                placeholder=""
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('referralCode')}
                onBlur={handleBlur('referralCode')}
                value={values.referralCode}
                error={touched.referralCode && errors.referralCode}
                errorMessage={errors.referralCode}
                showPasswordToggle={false}
            />

            <StyledButton
                title="Confirm"
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

      </ScrollView>
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
    paddingBottom: 30,
  },
  Icon: {
    alignSelf: 'flex-start',
     marginBottom: 10,
  },
  logo: {
    // marginTop: 200,
  },
  title: {
    fontSize: 24,
    // marginTop: 20,
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
  phoneContainer: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  phoneFlagContainer: {
    height: '100%',
    // borderColor: isFocused ? '#212121' : '#CCCCCC',
    borderColor: '#CCCCCC',
    // borderColor: 'gray',
    borderBottomWidth: 2,
    width: '100%',
  },
  focusedPhoneFlagContainer: {
    borderColor: '#212121',
  },
  phoneInputTextContainer: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
