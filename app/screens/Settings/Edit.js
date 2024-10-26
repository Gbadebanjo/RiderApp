import React, { useRef, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import InputField from '../../components/InputField';
import SelectInput from '../../components/SelectInput';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import BackButton from '../../components/BackButton';
import ISO6391 from 'iso-639-1';
import { AppContext } from '../../context/AppContext';
import * as Application from 'expo-application';
import updateApi from '../../api/auth';
import { setAuthToken } from '../../api/client';

const validationSchema = yup.object().shape({
  accountType: yup.string().required('Account Type is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  displayName: yup.string().required('Display Name is required'),
  otherLangSpoken: yup.string().required('Other Language is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  accessibility: yup.string().optional(),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
  phone: yup.string().required('Phone Number required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  referralCode: yup.string().optional(),
});

export default function UserDetails({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const phoneInputRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [languages, setLanguages] = useState([]);
  const [locationDetails, setLocationDetails] = useState({});
  const { userDetails, setUserDetails } = useContext(AppContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const pickDate = (date, setFieldValue) => {
    const formattedDate = date.toLocaleDateString();
    setSelectedDate(formattedDate);
    setFieldValue('dateOfBirth', formattedDate);
    hideDatePicker();
  };


  useEffect(() => {
    const fetchLanguages = () => {
      const languageItems = ISO6391.getAllNames().map((language) => ({
        label: language,
        value: language,
      }));
      setLanguages(languageItems);
    };

    const fetchLocationDetails = async () => {
      try {
        const location = await AsyncStorage.getItem('userLocation');
        if (location) {
          setLocationDetails(JSON.parse(location));
        }
      } catch (error) {
        console.error('Failed to fetch location details:', error);
      }
    };

    fetchLanguages();
    fetchLocationDetails();
  }, []);




  const handleUpdate = async (values) => {
    setLoading(true);
    console.log('values', values);
    const updatedValues = {
      ...values,
      location: {
        city: values.city,
        state: values.state,
        country: values.country,
      },
    };

    delete updatedValues.city;
    delete updatedValues.state;
    delete updatedValues.country;

    // console.log('Updated values:', updatedValues);

    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);
    const response = await updateApi.updateUser(updatedValues);

    if (!response.ok) {
      console.log(response);
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
    setUserDetails(response.data.rider);
    setLoading(false);
    return navigation.navigate('SettingHome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />

        <Formik
          initialValues={{
            accountType: 'Individual',
            firstName: userDetails?.firstName || '',
            lastName: userDetails?.lastName || '',
            middleName: userDetails?.middleName || '',
            displayName: userDetails?.displayName || '',
            otherLangSpoken: userDetails?.otherLangSpoken || '',
            dateOfBirth: userDetails?.dateOfBirth || '',
            gender: userDetails?.gender || '',
            email: userDetails?.email || '',
            phone: userDetails?.phone || '',
            referralCode: userDetails?.referralCode || '',
            country: userDetails?.location ? JSON.parse(userDetails.location).country : '',
            state: userDetails?.location ? JSON.parse(userDetails.location).state : '',
            city: userDetails?.location ? JSON.parse(userDetails.location).city : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <>
              <Text style={styles.profile}>Profile</Text>
              <InputField
                label="Account Type"
                placeholder=""
                width="100%"
                onBlur={handleBlur('accountType')}
                value={"Individual"}
                error={touched.accountType && errors.accountType}
                errorMessage={errors.accountType}
                paddingLeft={10}
              />

              <InputField
                label="First Name"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                paddingLeft={10}
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
                paddingLeft={10}
                error={touched.lastName && errors.lastName}
                errorMessage={errors.lastName}
                showPasswordToggle={false}
              />

              <InputField
                label="Middle Name"
                placeholder="John"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                paddingLeft={10}
                onChangeText={handleChange('middleName')}
                onBlur={handleBlur('middleName')}
                value={values.middleName}
                error={touched.middleName && errors.middleName}
                errorMessage={errors.middleName}
                showPasswordToggle={false}
              />

              <InputField
                label="Display Name (Alias)"
                placeholder="John"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                paddingLeft={10}
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                value={values.displayName}
                error={touched.displayName && errors.displayName}
                errorMessage={errors.displayName}
                showPasswordToggle={false}
              />

              <SelectInput
                label="Other Language Spoken"
                items={languages}
                value={values.otherLangSpoken}
                onValueChange={(value) => {
                  setSelectedLanguage(value);
                  handleChange('otherLangSpoken')(value);
                }}
                initialValue=""
                placeholder="Choose Language"
                error={touched.otherLangSpoken && errors.otherLangSpoken}
                errorMessage={errors.otherLangSpoken}
                width="100%"
              />
              {touched.otherLangSpoken && errors.otherLangSpoken && (
                <Text style={styles.errorText}>{errors.otherLangSpoken}</Text>
              )}

              <Text style={styles.phonelabel}>Date of Birth</Text>
              <View>
                <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                  <Text style={styles.dateText}>{values.dateOfBirth || 'Select Date'}</Text>
                  <AntDesign name="calendar" size={20} color="black" />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => pickDate(date, setFieldValue)}
                  onCancel={hideDatePicker}
                />
                {touched.dateOfBirth && errors.dateOfBirth && (
                  <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                )}
              </View>

              <SelectInput
                label="Gender"
                items={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' },
                ]}
                // placeholder='Select Gender'
                onValueChange={handleChange('gender')}
                initialValue={locationDetails.gender || ''}
                value={values.gender}
                width="100%"
                error={errors.gender}
                errorMessage={errors.gender}
              />
              {touched.gender && errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}

              <Text style={styles.phonelabel}>Phone Number</Text>
              <View style={styles.phoneContainer}>
                <PhoneInput
                  ref={phoneInputRef}
                  defaultValue={values.phone}
                  defaultCode="US"
                  layout="first"
                  onChangeText={handleChange('phone')}
                  containerStyle={[
                    styles.phoneFlagContainer,
                    isFocused && styles.focusedPhoneFlagContainer,
                  ]}
                  textContainerStyle={styles.phoneInputTextContainer}
                  withDarkTheme
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  // value={values.phone}
                  error={touched.phone && errors.phone}
                  errorMessage={errors.phone}
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <SelectInput
                label="Country"
                items={[
                  { label: 'United States', value: 'us' },
                  { label: 'United Kingdom', value: 'uk' },
                  { label: 'Nigeria', value: 'nigeria' },
                  { label: 'India', value: 'india' },
                ]}
                placeholder='Select Country'
                onValueChange={handleChange('country')}
                initialValue={values.country || ''}
                value={values.country}
                width="100%"
                error={errors.country}
                errorMessage={errors.country}
              />
              {touched.country && errors.country && (
                <Text style={styles.errorText}>{errors.country}</Text>
              )}

              <SelectInput
                label="State"
                items={[
                  { label: 'Lagos', value: 'lagos' },
                  { label: 'Ogun', value: 'ogun' },
                  { label: 'Osun', value: 'osun' },
                  { label: 'Others', value: 'others' },
                ]}
                placeholder='Select State'
                onValueChange={handleChange('state')}
                value={values.state}
                width="100%"
                error={errors.state}
                errorMessage={errors.state}
                initialValue={values.state || ''}
              />
              {touched.state && errors.state && (
                <Text style={styles.errorText}>{errors.state}</Text>
              )}

              <SelectInput
                label="City"
                items={[
                  { label: 'Ikeja', value: 'ikeja' },
                  { label: 'Lekki', value: 'lekki' },
                  { label: 'Ibadan', value: 'ibadan' },
                  { label: 'Others', value: 'others' },
                ]}
                placeholder='Select City'
                onValueChange={handleChange('city')}
                initialValue={values.city || ''}
                value={values.city}
                width="100%"
                error={errors.city}
                errorMessage={errors.city}
              />
              {touched.city && errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}


              <InputField
                label="Referral Code (optional)"
                placeholder="Your Code Here"
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                paddingLeft={10}
                onChangeText={handleChange('referralCode')}
                onBlur={handleBlur('referralCode')}
                value={values.referralCode}
                error={touched.referralCode && errors.referralCode}
                errorMessage={errors.referralCode}
                showPasswordToggle={false}
              />

              <StyledButton
                title={
                  loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    'Next'
                  )
                }
                onPress={handleSubmit}
                width="40%"
                height={53}
                paddingVertical={10}
                marginTop={40}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                borderRadius={10}
                marginLeft='60%'
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
    paddingTop: 30,
  },
  Icon: {
    marginBottom: 10,
    marginLeft: '5%',
  },
  profile: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
  },
  phonelabel: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#0E0E0E',
  },
  phoneContainer: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  dateContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 6,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#8A8A8A',
  },
  phoneFlagContainer: {
    height: '100%',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
});
