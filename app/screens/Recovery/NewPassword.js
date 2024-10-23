import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';
import BackButton from '../../components/BackButton';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .required('Enter your Password')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export default function NewPassword({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
     const formikRef = useRef(null); 

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    const handleContinue = async (values) => {
        navigation.navigate('ConfirmNewPassword', { password: values.password });
    }

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.allContents}>
                    <View style={styles.topContent}>
                        <BackButton/>     
                    </View>

                    <Text style={styles.title}>Enter New Password</Text>
                    <View style={styles.mainContainer} >                  
                        <Formik
                            innerRef={formikRef}
                            initialValues={{ password: '' }}
                            validationSchema={validationSchema}
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
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={touched.password && errors.password}
                                errorMessage={errors.password}
                                showPasswordToggle={true}
                              />
                            <View style={styles.Instructioncontainer}>
                                <Feather name="info" size={16} color="#111111" />
                                <Text style={styles.passwordInstruction}>
                                  Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, & 1 special character
                                </Text>
                             </View>
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
    Instructioncontainer: {
        flexDirection: 'row',
        gap: 5,
        width: '90%'
    },
  passwordInstruction: {
    fontSize: 11,
  },
})