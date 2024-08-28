import React, {useRef, useState} from 'react';
import api from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import InputField from '../../../components/InputField';
import StyledButton from '../../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';

const validationSchema = yup.object().shape({
    pinCode: yup
      .string()
      .length(4, 'Code must be exactly 4 digits')
      .required('Enter the 4-digit code'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Enter your Email Address'),
  });
  
const CELL_COUNT = 4;

export default function UsePincode({navigation}) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleContinue = async (values, { resetForm }) => {
        setLoading(true);
        const { email, pinCode } = values;
        const loginMethod = "pinCode";
    
        const response = await api.loginWithPincode(email, pinCode, loginMethod);
        Keyboard.dismiss();
        if (!response.ok) {
          setLoading(false);
          console.log(response.data)
          const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
          return setErrorMessage(errorMessage);
        }

        await AsyncStorage.setItem('userToken', response.data.data.token);
        await AsyncStorage.setItem('email', email);
    
        if (response.data.data.isComplete === false) {
          return navigation.navigate('UserDetails', { email })
        }
    
        if (Array.isArray(response.data.data.isSecured) && response.data.data.isSecured.length < 2) {
          return navigation.navigate('Security', { email });
        }
    
        setLoading(false);
          resetForm();
         return navigation.navigate('MenuLanding');
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Pin</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate('SettingToggle')}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Login with your 4 Digit pin</Text>  

            {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

            <View style={styles.mainContent}>
                <View>
                    <Formik
                        initialValues={{ email: '', pinCode: '', }}
                        validationSchema={validationSchema}
                        onSubmit={handleContinue}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <InputField
                                label="Email"
                                placeholder="user@rydepro.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textContentType="email"
                                returnKeyType="next"
                                width="100%"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                paddingLeft={0}
                                marginTop={0}
                                paddingVertical={5}
                                error={touched.email && errors.email}
                                errorMessage={errors.email}
                            />

                            <Text style={styles.Pincode}>Pincode</Text>  
                            <CodeField
                                ref={ref}
                                {...props}
                                value={values.pinCode}
                                onChangeText={handleChange('pinCode')}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                // keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                // onSubmitEditing={handleSubmit} 
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

                            <StyledButton
                                title="Save"
                                loading={loading}
                                onPress={handleSubmit}
                                width="100%"
                                height={53}
                                paddingVertical={10}
                                marginTop={70}
                                backgroundColor="#212121"
                                borderWidth={2}
                                TextColor="#fff"
                                iconName="angle-right" 
                            />
                        </>
                        )}


                    </Formik>
                </View>
            </View>        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    Pincode: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '400',
    },
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        alignSelf: 'center',
    },
    mainContent: {
        marginTop: 50,
        width: '100%',
    },
    logoText:{
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        alignSelf: 'center',
    },
    codeFieldRoot: {
        // marginTop: 10,
        width: '80%',
        alignSelf: 'center',
      },
      cell: {
        width: 40,
        height: 40,
        marginTop: 20,
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
      errorText: {
        color: 'red',
      }
});