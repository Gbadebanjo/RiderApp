import React, {useRef, useState, useContext} from 'react';
import api from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../../../context/AppContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

const validationSchema = yup.object().shape({
    pinCode: yup
      .string()
      .length(6, 'Code must be exactly 6 digits')
      .required('Enter the 6-digit code'),
  });
  
const CELL_COUNT = 6;

export default function UsePincode({navigation}) {
    const [loading, setLoading] = useState(false);
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef();


    const handleContinue = async (values) => {
        setLoading(true);

        const { pinCode } = values;
        const email = await AsyncStorage.getItem('email');
        if (!email) {
          return Toast.show({
            type: 'error', 
            text1: 'Please login with your email and password to acesss your account',
          });
        }

        const getLocation= await AsyncStorage.getItem('userLocation');
        const stringLocation = JSON.parse(getLocation);
        const location = {
          long: stringLocation.longitude,
          lat: stringLocation.latitude,
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
    
        const response = await api.loginWithPincode(email, pinCode, deviceInfo, location);
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
        await AsyncStorage.setItem('bioToken', response.data.bioToken);
        setUserDetails(response.data.rider);
    
          setLoading(false);
         return navigation.navigate('WelcomeHome');
      }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.mainContent}>
                <View style={styles.pinContainer}> 
                    <Fontisto name="locked" size={70} color="black" />
                    <Text style={styles.subTitle}>Enter Pin</Text>    
                </View>                  
                <View>
                    <Formik
                        innerRef={formRef}
                        initialValues={{ pinCode: '', }}
                        validationSchema={validationSchema}
                        onSubmit={handleContinue}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>

                            <CodeField
                                ref={ref}
                                {...props}
                                value={values.pinCode}
                                onChangeText={handleChange('pinCode')}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="name-phone-pad"
                                textContentType="oneTimeCode"
                                // onSubmitEditing={} 
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
                            {touched.pinCode && errors.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}

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
    </TouchableWithoutFeedback>
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
        ...Platform.select({
            ios: {
                borderRadius: 8,
                borderColor: 'red',
            },
            android: {
                borderRadius: 4,
            },
        }),
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