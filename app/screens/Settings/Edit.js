import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import PhoneInput from 'react-native-phone-number-input';
import StyledButton from '../../components/StyledButton';
import Centerlogo from '../../components/centerlogo';
import BackButton from '../../components/BackButton';
import InputField from '../../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';
import updateOtp from '../../api/auth';
import { setAuthToken } from '../../api/client';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  displayName: yup.string().required('Display Name is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  emergencyContact: yup.string().required('Emergency Contact is required'),
  emergencyPhoneNumber: yup.string().required('Emergency Phone Number is required'),
});

export default function Edit({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneInputRef = useRef(null);
  const { userDetails, setUserDetails } = useContext(AppContext);

  const emergency = JSON.parse(userDetails.emergency || '{}');

  const handleUpdate = async (values) => {
    setLoading(true);
    console.log('Form values:', values);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      phone: values.phoneNumber, 
      emergency: {
        name: values.emergencyContact, 
        phone: values.emergencyPhoneNumber,
      },
    };
    console.log('Payload:', payload);

    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);

    try {
      const response = await updateOtp.updateUser(payload);
      if (!response.ok) {
        setLoading(false);
        // console.error('An error occurred:', response.data.message);
        return Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
      });
      // console.log('User details updated:', response.data.info);
      // setUserDetails(response.data.info);
      navigation.goBack();
    }
    catch (error) {
      setLoading(false);
      console.error('An error occurred:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again',
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />
        <Centerlogo align="left" />

        <Formik
          initialValues={{
            firstName: userDetails.firstName || '',
            lastName: userDetails.lastName || '',
            displayName: userDetails.displayName || '',
            phoneNumber: userDetails.phone || '',
            emergencyContact: emergency.name || '', 
            emergencyPhoneNumber: emergency.phone || '', 
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleUpdate(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <InputField
                label="First Name"
                placeholder="John"
                autoCapitalize="none"
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
                placeholder="Doe"
                autoCapitalize="none"
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
                placeholder="JohnD"
                autoCapitalize="none"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                value={values.displayName}
                error={touched.displayName && errors.displayName}
                errorMessage={errors.displayName}
                showPasswordToggle={false}
              />

              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <PhoneInput
                  ref={phoneInputRef}
                  defaultValue={values.phoneNumber}
                  defaultCode="US"
                  layout="first"
                  onChangeText={handleChange('phoneNumber')}
                  containerStyle={[
                    styles.phoneFlagContainer,
                    isFocused && styles.focusedPhoneFlagContainer,
                  ]}
                  textContainerStyle={styles.phoneInputTextContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={values.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </View>

              <InputField
                label="Emergency Contact(Name)"
                placeholder="Jane Doe"
                autoCapitalize="none"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('emergencyContact')}
                onBlur={handleBlur('emergencyContact')}
                value={values.emergencyContact}
                error={touched.emergencyContact && errors.emergencyContact}
                errorMessage={errors.emergencyContact}
                showPasswordToggle={false}
              />

              <Text style={styles.label}>Emergency Number</Text>
              <View style={styles.phoneContainer}>
                <PhoneInput
                  ref={phoneInputRef}
                  defaultValue={values.emergencyPhoneNumber}
                  defaultCode="US"
                  layout="first"
                  onChangeText={handleChange('emergencyPhoneNumber')}
                  containerStyle={[
                    styles.phoneFlagContainer,
                    isFocused && styles.focusedPhoneFlagContainer,
                  ]}
                  textContainerStyle={styles.phoneInputTextContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={values.emergencyPhoneNumber}
                />
                {touched.emergencyPhoneNumber && errors.emergencyPhoneNumber && (
                  <Text style={styles.errorText}>{errors.emergencyPhoneNumber}</Text>
                )}
              </View>

              <StyledButton
                title="Update"
                loading={loading}
                onPress={handleSubmit} 
                width="100%"
                height={53}
                paddingVertical={10}
                marginTop={20}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
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
  },
  Icon: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#212121',
    marginTop: 15,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    alignSelf: 'flex-start',
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
