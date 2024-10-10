import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import InputField from '../../../components/InputField';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import BackButton from '../../../components/BackButton';

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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const phoneInputRef = useRef(null);

    const saveEmail = AsyncStorage.setItem('email', email);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />
        <View style={styles.logo} >
          <Centerlogo align="left" />
        </View>

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
        onSubmit={async (values) => {
          try {
            await AsyncStorage.setItem('loginDetails', JSON.stringify(values));
            navigation.navigate('SecurityIntro', {values});
          } catch (error) {
            Alert.alert('Error', 'Failed to save user login details.');
          }
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
                style={styles.formik}
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
          {/* 
            <SelectInput
                label="Accessibility (Optional)"
                items={[
                    { label: 'Service Dogs', value: 'serviceDogs' },
                    { label: 'Wheel Chair', value: 'wheelChair' },
                    { label: 'Elderly', value: 'elderly' },
                    { label: 'Others', value: 'others' },
                ]}
                placeholder='Accessibility (Optional)'
                onValueChange={handleChange('accessibility')}
                value={values.accessibility}
                width="100%"
                error={errors.accessibility}
            /> */}

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

            <Text style={styles.phonelabel}>Phone Number</Text>
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
                title="Continue"
                onPress={handleSubmit}
                width="100%"
                height={53}
                paddingVertical={10}
                marginTop={40}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                borderRadius={30} 
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  Icon: {
    alignSelf: 'flex-start',
     marginBottom: 10,
  },
  logo: {
    marginBottom: 20,
  },
  phonelabel: {
    marginTop: 15,
  },
  phoneContainer: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  phoneFlagContainer: {
    height: '100%',
    borderColor: '#CCCCCC',
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
