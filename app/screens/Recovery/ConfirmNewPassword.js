import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/BackButton';
import InputField from '../../components/InputField';
import Toast from 'react-native-toast-message';
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = (password) => yup.object().shape({
    confirmPassword: yup
        .string()
        .oneOf([password], 'Passwords do not match')
        .required('Confirm your Password'),
});

export default function ConfirmNewPassword({ navigation, route }) {
    const { password } = route.params;
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const formikRef = useRef(null); 
    
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    const handleContinue = async (values) => {
        navigation.navigate('Security');
        Toast.show({
            type: 'success',
            // text1: response.data.message,
            text1: "Account Recovery Successful",
        });
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