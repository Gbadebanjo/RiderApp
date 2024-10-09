import React, {useRef, useState, useContext} from 'react';
import api from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../../context/AppContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

const validationSchema = yup.object().shape({
    confirmCode: yup
      .string()
      .length(6, 'Code must be exactly 6 digits')
      .required('Enter the 6-digit code'),
  });
  
const CELL_COUNT = 6;

export default function ConfirmPinCode({navigation}) {
    const formRef = useRef();
    const route = useRoute();
    const { pinCode } = route.params;
    console.log('Received PinCode:', pinCode);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { userDetails, setUserDetails } = useContext(AppContext);


    const handleContinue = async (values) => {
        setLoading(true);

        if (values.confirmCode !== pinCode) {
            setLoading(false);
            return Toast.show({
                type: 'error', 
                text1: 'Pincode and Confirm Pincode do not match',
            });
        }

        const userDetailsString = await AsyncStorage.getItem('userDetails');
        details = JSON.parse(userDetailsString);
        const { confirmCode } = values;
        const email = details.email;

        const deviceInfo = {
            deviceId: "12345",
            deviceName: "Tecno",
            deviceType: "Android"
        }

        const response = await api.loginWithPincode(email, confirmCode, deviceInfo);
        Keyboard.dismiss();
        if (!response.ok) {
          setLoading(false);
          const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
          return Toast.show({
            type: 'error', 
            text1: errorMessage,
          });
        }
        Toast.show({
            type: 'success',
            text1: response.data.message,
        });
        await AsyncStorage.setItem('userToken', response.data.token);
        setUserDetails(response.data.rider);
    
          setLoading(false);
         return navigation.navigate('WelcomeHome');
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.mainContent}>
                <View style={styles.pinContainer}> 
                    <Fontisto name="locked" size={70} color="black" />
                    <Text style={styles.subTitle}>Confirm Pin</Text>    
                </View>                  
                <View>
                    <Formik
                        innerRef={formRef}
                        initialValues={{ confirmCode: '', }}
                        validationSchema={validationSchema}
                        onSubmit={handleContinue}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>

                            <CodeField
                                ref={ref}
                                {...props}
                                value={values.confirmCode}
                                onChangeText={handleChange('confirmCode')}
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
                                    {symbol ? '*' :(isFocused ? <Cursor /> : null)}
                                </Text>
                                )}
                                />
                            {touched.confirmCode && errors.confirmCode && <Text style={styles.errorText}>{errors.confirmCode}</Text>}

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
                <TouchableOpacity onPress={() => formRef.current.handleSubmit()}>
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
        width: '90%',
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