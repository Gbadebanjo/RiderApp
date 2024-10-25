import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Keyboard, Platform } from 'react-native'
import React, { useState, useRef, useContext } from 'react';
import recoveryApi from '../../api/auth'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import InputField from '../../components/InputField';
import Toast from 'react-native-toast-message';
import StyledButton from '../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AppContext } from '../../context/AppContext';

const validationSchema = (password) => yup.object().shape({
    confirmPassword: yup
        .string()
        .oneOf([password], 'Passwords do not match')
        .required('Confirm your Password'),
});

export default function ConfirmNewPassword({ navigation, route }) {
    const { password, email } = route.params;
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const formikRef = useRef(null); 
    const { userDetails, setUserDetails } = useContext(AppContext);
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

    const handleContinue = async (values, { resetForm }) => {
      const confirmNewPassword = values.confirmPassword
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
      };
      
      setLoading(true);
      const response = await recoveryApi.createNewPassword(email, password, confirmNewPassword, deviceInfo );
      Keyboard.dismiss();
      if (!response.ok) {
        setLoading(false);
        return Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
      await AsyncStorage.setItem('userToken', response.data.token);
      setUserDetails(response.data.rider);
      Toast.show({
        type: 'success',
        text1: response.data.message,
      });
      resetForm();
     navigation.navigate('Security');
    return setLoading(false);
    }

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.allContents}>
                    <View style={styles.topContent}>
                        <BackButton/>     
                    </View>

                    <Text style={styles.title}>Confirm New Password</Text>
                    <View style={styles.mainContainer} >                  
                        <Formik
                            innerRef={formikRef}
                            initialValues={{ confirmPassword: '' }}
                            validationSchema={validationSchema(password)}
                            onSubmit={handleContinue}
                        >
                            {({ handleChange, handleBlur, values, errors, touched }) => (
                            <>     
                            <InputField
                                label=""
                                placeholder=""
                                keyboardType="password"
                                autoCapitalize="none"
                                textContentType="password"
                                returnKeyType="next"
                                width="100%"
                                paddingLeft={10}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                error={touched.confirmPassword && errors.confirmPassword}
                                errorMessage={errors.confirmPassword}
                                showPasswordToggle={true}
                              />
                          </>
                          )}
                        </Formik>
                    </View> 

                </View>
          
                <StyledButton
                    title={
                        loading ? (
                        <ActivityIndicator color="#fff" />
                        ) : (
                        'Next'
                        )
                    }
                    onPress={() => {
                        Keyboard.dismiss();
                        formikRef.current.handleSubmit();
                    }}
                    width="40%"
                    paddingVertical={13}
                    marginLeft='60%'
                    marginTop={0}
                    marginBottom='10%'
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    borderRadius={10}
                />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    allContents: {
        marginTop: '5%',
    },
    topContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    title: {
        marginTop: '8%',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center'
    },
})