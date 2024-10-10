import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';
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


    const handleContinue = async (values) => {
        alert(values.email)
    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.allContents}>
            <View style={styles.centralLogo}>
                {/* <Centerlogo logoWidth='100%' logoHeight= '60%'  /> */}
                <Image source={defaultLogo} style={styles.logo}/>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={()=> navigation.goBack()}>
                    <MaterialIcons name="keyboard-backspace" size={24} color={'black'}/>
                        <Text> Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Account Recovery</Text>
            <View style={styles.mainContainer} >
                <Formik
                    initialValues={{ email: ''  }}
                    validationSchema={validationSchema}
                    onSubmit={handleContinue}
                >
                    {({ handleChange, handleBlur, handleContinue, values, errors, touched }) => (
                    <>
                        <View>
                            <InputField
                                label="Registered Email Address"
                                placeholder=""
                                keyboardType="email-address"
                                autoCapitalize="none"
                                textContentType="email"
                                returnKeyType="next"
                                width="100%"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                                errorMessage={errors.email}
                                />
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
                                    handleContinue();
                                }}
                                width="100%"
                                height={53}
                                paddingVertical={10}
                                marginTop={40}
                                backgroundColor="#212121"
                                borderWidth={2}
                                TextColor="#fff"
                                borderRadius={20}
                            />
                    </>
                    )}
                </Formik>
            </View> 

        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    allContents: {
        // flex: 1,
        // justifyContent: 'space-between',
    },
    centralLogo:{
        marginTop: 20,
    },
    backButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '20%',
        marginTop: 20,
        position: 'absolute',
    },
    logo: {
        width: '100%',
        height: '55%',
        resizeMode: 'contain',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
    },
    styledButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: 'red',
    },
})