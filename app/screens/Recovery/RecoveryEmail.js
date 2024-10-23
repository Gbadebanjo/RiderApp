import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Keyboard, Modal } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';
import BackButton from '../../components/BackButton';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const defaultLogo = require('../../assets/newRydeproLogo.png');


const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Enter your Email Address'),
  });


export default function EnterEmail({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
     const formikRef = useRef(null); 

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    const handleContinue = async (values) => {
        navigation.navigate('RecoveryCode', values);
    }

  return (
    <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.allContents}>
                    <View style={styles.topContent}>
                        <BackButton/>
                        <TouchableOpacity onPress={toggleModal} style={styles.dotsButton}>
                        <Entypo name="dots-three-horizontal" size={24} color="black" />
                        </TouchableOpacity>      

                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={toggleModal}
                            animationType="fade"
                        >
                            <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity onPress={()=> navigation.navigate('RecoveryEmail')}>
                                <Text style={styles.modalItem}>Account Recovery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Text style={styles.modalItem}>Contact Us</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <Text style={styles.modalItem}>Faq</Text>
                                </TouchableOpacity>
                            </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <Centerlogo logoWidth='100%' logoHeight={80} />

                    <Text style={styles.title}>Account Recovery</Text>
                    <View style={styles.mainContainer} >                  
                        <Formik
                            innerRef={formikRef}
                            initialValues={{ email: ''  }}
                            validationSchema={validationSchema}
                            onSubmit={handleContinue}
                        >
                            {({ handleChange, handleBlur, values, errors, touched }) => (
                            <>     
                            <InputField
                                label="Registered Email Address"
                                placeholder=""
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textContentType="email"
                                returnKeyType="next"
                                width="100%"
                                paddingLeft={10}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                                errorMessage={errors.email}
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
                        'Send Verification'
                        )
                    }
                    onPress={() => {
                        Keyboard.dismiss();
                        formikRef.current.handleSubmit();
                    }}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
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
    dotsButton: {
        position: 'absolute',
        right: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        marginTop: 60,
        marginRight: 20,
    },
    modalItem: {
        color: 'white',
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center',
    },
    title: {
        marginTop: '8%',
        fontSize: 24,
        fontWeight: '500'
    },
})