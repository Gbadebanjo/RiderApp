import React, {useState} from 'react';
import passwordApi from '../../../api/auth'
import { StyleSheet, Text, View, StatusBar, TextInput, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../../components/InputField';
import BackButton from '../../../components/BackButton';
import StyledButton from '../../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Enter your Email Address'),
  });

export default function UsePassphrase({navigation, route}) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passPhraseCount, setPassPhraseCount] = useState(0);
    const [buttonColor, setButtonColor] = useState('#21212133');
    const [buttonDisabled, setButtonDisabled] = useState(true); 

    const handleContinue = async (values, { resetForm }) => {
        setLoading(true);
        const { email, passPhrase } = values;
        const loginMethod = "passPhrase";
    
        const response = await passwordApi.loginWithPassPhrase(email, passPhrase, loginMethod);
        Keyboard.dismiss();
        if (!response.ok) {
          setLoading(false);
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
                <Text style={styles.title}>Sign In using passphrase</Text>
            </View>  
            <Text style={styles.subTitle}>Kindly provide phrase accordingly to login</Text>  
            <View style={styles.mainContent}>

             {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

                <View style={styles.generateContainer}>
                    <Formik
                        initialValues={{ email: '', passPhrase: '', }}
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
                                fullBorder='true'
                                borderRadius={8}
                                paddingLeft={10}
                                marginTop={0}
                                paddingVertical={10}
                                error={touched.email && errors.email}
                                errorMessage={errors.email}
                            /> */}

                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    multiline={true}
                                    textAlignVertical="center"
                                    onChangeText={(text) => {
                                        handleChange('passPhrase')(text);
                                        setPassPhraseCount(text.length);
                                        if (text.length > 0) {
                                            setButtonColor('#212121'); // Change to black
                                            setButtonDisabled(false); // Enable button
                                          } else {
                                            setButtonColor('#808080'); // Keep grey
                                            setButtonDisabled(true); // Disable button
                                          }
                                      }}
                                    placeholder='Provide your passphrase here'
                                    onBlur={handleBlur('passPhrase')}
                                    value={values.passPhrase}
                                />
                                <Text style={styles.characterCount}>{passPhraseCount} of 1000 characters</Text>
                                                            
                            </View>

                            <StyledButton
                                title="Login"
                                onPress={handleSubmit}
                                width="100%"
                                height={53}
                                loading={loading}
                                paddingVertical={10}
                                marginTop={50}
                                backgroundColor={buttonColor}
                                borderWidth={0}
                                TextColor="#fff"
                                borderRadius={20}
                                disabled={buttonDisabled}
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
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 23,
        fontWeight: '700',
        marginLeft: '5%'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        width: '100%',
        textAlign: 'center',
    },
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 0,
    },
    mainContent: {
        flex: 1,
        width: '100%',
        gap: 50,
        marginTop: 10,
    },
    generateContainer: {
        flex: 1,
        marginTop: '15%',
        justifyContent: 'space-between',
        marginBottom: '10%'
    },
    generateText:{
        fontSize: 16,
        fontWeight: '700',
    },
    passPhrase: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: '400',
        width: '100%',
        textAlign: 'start',
    },
    textInput: {
        marginTop: 2,
        borderColor: '#3C3C3C',
        borderWidth: 1,
        width: '100%',
        borderRadius: 8,
        padding: 20,
    },
    characterCount:{
        textAlign: 'right',
        color: '#909090',
        fontSize: 12,
    }
});