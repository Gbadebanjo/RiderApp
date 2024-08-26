import React, {useState} from 'react';
import api from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import InputField from '../../../components/InputField';
import SelectInput from '../../../components/SelectInput';
import * as yup from 'yup'; 
import BackButton from '../../../components/BackButton';

const validationSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zipcode: yup.string().optional(),
});

export default function ResidencyLocation({navigation, route}) {
  const { userDetails } = route.params;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = async (values, { resetForm }) => {
    setLoading(true);

    const accountDetails = {
      ...userDetails,
      ...values
    };

    const response = await api.additionalInfo(accountDetails);
    Keyboard.dismiss();
    if (!response.ok) {
      setLoading(false);
      const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
      return setErrorMessage(errorMessage);
    }

    setLoading(false);
    // resetForm();
    alert(response.data.data.message);
    navigation.navigate('Security', {email: userDetails.email});
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />
        <Centerlogo align="left"/>
        <Text style={styles.title}>Residency Location</Text>

      {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

      <Formik
        initialValues={{
             country: '',
             state: '',
             city: '',
             zipCode: '',
            }}
        validationSchema={validationSchema}
        onSubmit={handleConfirm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
           <>
            <SelectInput
                label="Country"
                items={[
                    { label: 'United States', value: 'us' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'Nigeria', value: 'nigeria' },
                    { label: 'India', value: 'india' },
                ]}
                placeholder={{ label: 'Select Country', value: ""  }}
                onValueChange={handleChange('country')}
                value={values.country}
                width="100%"
                error={errors.country}
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
                placeholder={{ label: 'Select state', value: ""  }}
                onValueChange={handleChange('state')}
                value={values.state}
                width="100%"
                error={errors.state}
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
                placeholder={{ label: 'Select city', value: "" }}
                onValueChange={handleChange('city')}
                value={values.city}
                width="100%"
                error={errors.city}
            />
             {touched.city && errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
            )}

            <InputField
                label="Zip Code"
                placeholder=""
                autoCapitalize="none"
                textContentType=""
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('zipCode')}
                onBlur={handleBlur('zipCode')}
                value={values.zipCode}
                error={touched.zipCode && errors.zipCode}
                errorMessage={errors.zipCode}
              />
             {touched.zipCode && errors.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode}</Text>
            )}

            <StyledButton
                title="Confirm"
                loading={loading}
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
    // alignItems: 'center',
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
    fontSize: 20,
    marginTop: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
});
