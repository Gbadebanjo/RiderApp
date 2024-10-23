import React, {useRef, useState, useEffect} from 'react';
// import otpApi from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, StatusBar, Keyboard, ScrollView, TouchableWithoutFeedback, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Centerlogo from '../../components/centerlogo';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import StyledButton from '../../components/StyledButton';
import BackButton from '../../components/BackButton';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .length(4, 'Code must be exactly 4 digits')
    .required('Enter the 4-digit code'),
});

const CELL_COUNT = 4;

export default function RecoveryCode({navigation, route}) {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [countdown, setCountdown] = useState(180);
    const [modalVisible, setModalVisible] = useState(false);
    const formikRef = useRef(null); 

    const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    const handleVerify = async (values, {resetForm}) => {
      setLoading(true);
      // const response = await otpApi.verifyOtp(email, values.code);
      // Keyboard.dismiss();
      // if (!response.ok) {
      //   setLoading(false);
      //   return Toast.show({
      //     type: 'error',
      //     text1: response.data.message,
      //   });
      // }
      // Toast.show({
      //   type: 'success',
      //   text1: response.data.message,
      // });
      // resetForm();
     navigation.navigate('RecoveryPhoneNumber');
    return setLoading(false);
    }

    const handleResend = async () => {
      setLoading(true);
      const res = await otpApi.requestOtp(email, password, confirm);
  
      setLoading(false);
      if (res.ok) {
        setCountdown(180);
        Toast.show({
          type: 'success',
          text2: res.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text2: res.data.message,
        });
      }
    }

    useEffect(() => {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [countdown]);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View>
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
              <Text style={styles.title}>Enter Verification code</Text>
              <Text style={styles.subtitle}>Enter the verification sent to your email</Text>

            <Formik
                innerRef={formikRef}
                initialValues={{ code: '' }}
                validationSchema={validationSchema}
                onSubmit={handleVerify}
              >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                  <>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={values.code}
                        onChangeText={handleChange('code')}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType='name-phone-pad'
                        textContentType="oneTimeCode"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
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
                                {/* {symbol || (isFocused ? <Cursor /> : null)} */}
                                 {symbol ? '*' : (isFocused ? <Cursor /> : null)}
                        </Text>
                        )}
                        />
                    {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

                      {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}
                  </>
                )}
              </Formik>
          
              <View style={styles.lowerparts}>
                <Text style={styles.resendText}>I didn’t receive any code? {formatTime(countdown)}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity disabled={countdown > 0} onPress={handleResend}>
                      <Text style={[styles.resendCode, countdown > 0 && styles.disabledText]}>Resend code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled>
                          <Text style={styles.disabledText}>Send SMS</Text>
                    </TouchableOpacity>
                  </View>
              </View>            
            </View>
            
                <StyledButton
                    title={
                        loading ? (
                        <ActivityIndicator color="#fff" />
                        ) : (
                        'Confirm'
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
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    borderRadius={10}
                />
          </View> 
      </ScrollView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 20,
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
    fontSize: 24,
    marginTop: 30,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 0,
    alignSelf: 'center',
  },
  bigerrorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
  lowerparts:{
    marginTop: 50,
    },
  buttonContainer:{
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  resendText:{
    textAlign: 'center',
  },
  resendCode:{
    fontWeight: '700',
  },
  codeFieldRoot: {
    marginTop: 50,
    width: '100%',
    alignSelf: 'center',
  },
  cell: {
    width: 40,
    paddingVertical: '5%',
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#CCCCCC',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000000',
  },
  completeCell: {
    borderColor: '#000000',
},
  disabledText: {
    color: 'gray', 
  },
});
