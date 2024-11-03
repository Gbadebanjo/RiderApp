import React, { useRef, useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Platform, ActivityIndicator, Button, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import signupApi from '../../api/auth'
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import Toast from 'react-native-toast-message';
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import InputField from '../../components/InputField';
import SelectInput from '../../components/SelectInput';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import BackButton from '../../components/BackButton';
import ISO6391 from 'iso-639-1';
import { AppContext } from '../../context/AppContext';

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
    phoneNumber: yup.string().required('Phone Number required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    referralCode: yup.string().optional(),
});

export default  function UserDetails({navigation, route}) {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const phoneInputRef = useRef(null);
    const saveEmail = AsyncStorage.setItem('email', email);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());``
    const [languages, setLanguages] = useState([]);
    const [locationDetails, setLocationDetails] = useState({});
    const { userDetails, setUserDetails } = useContext(AppContext);
  
     const showDatePicker = () => {
      setDateModalVisible(true);
     };
  
    const hideDatePicker = () => {
      setDateModalVisible(false);
    };
  
    const pickDate = () => {
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


  const handleNext = async (values) => {
    setLoading(true)
    const { email, firstName, middleName, lastName, otherLangSpoken, dateOfBirth, phoneNumber, gender, displayName, country, state, city, } = values;
      const countryCode = phoneInputRef.current.getCallingCode();
      const phone = `${countryCode}${phoneNumber}`;
      const getLocation= await AsyncStorage.getItem('userLocation');
      const stringLocation = JSON.parse(getLocation);
      const signupLocation = {
        long: stringLocation.longitude,
        lat: stringLocation.latitude,
      }
    
      const location = {
        country,
        state,
        city
      }
          
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
      const response = await signupApi.signUp(email, firstName, middleName, lastName, otherLangSpoken, dateOfBirth, phone, displayName, deviceInfo, signupLocation, location,  gender,);
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
      const token = response.data.rider.token
      await AsyncStorage.setItem('userToken', token);
      // console.log('response', response.data.rider.rider)
      setUserDetails(response.data.rider.rider);
      setLoading(false);
      return navigation.navigate('Photo');
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />

      <Formik
        initialValues={{
             accountType: 'Individual',
             firstName: '',
             lastName: '',
             middleName: '',
             displayName: '',
             otherLangSpoken: selectedLanguage || '',
             dateOfBirth: '', 
             gender: '',
             email: email,
             phoneNumber: '',
             referralCode: '',
             country: locationDetails.country || '',
             state: locationDetails.state || '',
             city: locationDetails.city || '',
            }}
        validationSchema={validationSchema}
          onSubmit={handleNext}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <>
            <Text style={styles.profile}>Profile</Text>
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
                paddingLeft={10}
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
                value={selectedLanguage}
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

              {/* <Text style={styles.phonelabel}>Date of Birth</Text> */}
              <View>
                {/* <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                  <Text style={styles.dateText}>{values.dateOfBirth  || 'Select Date'}</Text>
                  <AntDesign name="calendar" size={20} color="black" />
                </TouchableOpacity> */}
                <InputField
                    label="Date of Birth"
                    placeholder='12-24-2024'
                    autoCapitalize="none"
                    textContentType=""
                    returnKeyType="next"
                    width="100%"
                    paddingLeft={10}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    value={values.dateOfBirth}
                    error={touched.dateOfBirth && errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth}
                    showPasswordToggle={false}
                  />
                </View>

              <SelectInput
                label="Gender"
                items={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                ]}
                placeholder='Select Gender'
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
              
            <InputField
                label="Email Address"
                placeholder="rydapro@gmail.com"
                autoCapitalize="none"
                textContentType="email"
                returnKeyType="next"
                width="100%"
                paddingLeft={10}
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
                    defaultValue={values.phoneNumber}
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
                  {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
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
                initialValue={locationDetails.country || ''}
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
                initialValue={locationDetails.state || ''}
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
                initialValue={locationDetails.city || ''}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});
