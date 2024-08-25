// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import { Formik } from 'formik';
import InputField from '../../../components/InputField';
import SelectInput from '../../../components/SelectInput';
import * as yup from 'yup'; 
import BackButton from '../../../components/BackButton';
// import axios from 'axios';

const validationSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zipcode: yup.string().optional(),
});

export default function ResidencyLocation({navigation, route}) {
  const { userDetails } = route.params;

  console.log(userDetails);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton style={styles.Icon} />
        <Centerlogo align="left"/>
        <Text style={styles.title}>Residency Location</Text>

      <Formik
        initialValues={{
             country: '',
             state: '',
             city: '',
             zipCode: '',
            }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
        navigation.navigate('Security');
        // alert('Details updated');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
           <>
            <SelectInput
                label="Country"
                items={[
                    { label: 'United States', value: 'US' },
                    { label: 'United Kingdom', value: 'UK' },
                    { label: 'Nigeria', value: 'Nigeria' },
                    { label: 'India', value: 'India' },
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
                    { label: 'Lagos', value: 'Lagos' },
                    { label: 'Ogun', value: 'Ogun' },
                    { label: 'Elderly', value: 'elderly' },
                    { label: 'Others', value: 'others' },
                ]}
                placeholder={{ label: 'Accessibility (Optional)', value: ""  }}
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
                    { label: 'Service Dogs', value: 'serviceDogs' },
                    { label: 'Wheel Chair', value: 'wheelChair' },
                    { label: 'Elderly', value: 'elderly' },
                    { label: 'Others', value: 'others' },
                ]}
                placeholder={{ label: 'Accessibility (Optional)', value: "" }}
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
                showPasswordToggle={true}
                // marginLeft={20}
              />
             {touched.zipCode && errors.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode}</Text>
            )}

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
//   formContainer: {
//     width: '100%',
//   },
});
