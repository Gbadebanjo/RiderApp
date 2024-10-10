import React, {useState, useContext} from 'react';
import passphraseApi from '../../../api/auth'
import { StyleSheet, Text, View, StatusBar, TextInput, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AppContext } from '../../../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import StyledButton from '../../../components/StyledButton';
import { Formik } from 'formik';

export default function UsePassphrase({navigation, route}) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passPhraseCount, setPassPhraseCount] = useState(0);
    const [buttonColor, setButtonColor] = useState('#21212133');
    const [buttonDisabled, setButtonDisabled] = useState(true); 
    const { userDetails, setUserDetails } = useContext(AppContext);

      const handleContinue = async (values, { resetForm }) => {
        setLoading(true);

        const userDetailsString = await AsyncStorage.getItem('userDetails');
        details = JSON.parse(userDetailsString);
        const { passPhrase } = values;
        const email = details.email;

        const deviceInfo = {
            deviceId: "12345",
            deviceName: "Tecno",
            deviceType: "Android"
        }

        const response = await passphraseApi.loginWithPassPhrase(email, passPhrase, deviceInfo);
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
          resetForm();
         return navigation.navigate('WelcomeHome');
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
                        initialValues={{passPhrase: '', }}
                        // validationSchema={validationSchema}
                        onSubmit={handleContinue}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>

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