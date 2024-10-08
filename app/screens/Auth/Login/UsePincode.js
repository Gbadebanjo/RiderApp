import React, {useRef, useState} from 'react';
import api from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../../components/InputField';
import StyledButton from '../../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

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

            <View style={styles.mainContent}>
                <View style={styles.pinContainer}> 
                    <Fontisto name="locked" size={70} color="black" />
                    <Text style={styles.subTitle}>Enter Pin</Text>    
                </View>                  
                <View>
                    <Formik
                        // initialValues={{ email: '', pinCode: '', }}
                        initialValues={{ pinCode: '', }}
                        validationSchema={validationSchema}
                        onSubmit={handleContinue}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            {/* <InputField
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
                            /> */}

                            <CodeField
                                ref={ref}
                                {...props}
                                value={values.pinCode}
                                onChangeText={handleChange('pinCode')}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
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

                        </>
                        )}

                    </Formik>

                    {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}
                </View>
            </View> 

            <View style={styles.bottomContent}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> navigation.goBack()}>
                    <MaterialIcons name="keyboard-backspace" size={24} color={'black'}/>
                    <Text> Back</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
    },
    pinContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    subTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: '400',
    },
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        alignSelf: 'center',
    },
    mainContent: {
        marginTop: '30%',
        width: '100%',
    },
    codeFieldRoot: {
        marginTop: '15%',
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
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: "10%"
    }
});