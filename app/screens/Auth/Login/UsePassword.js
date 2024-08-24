import React, {useState} from 'react';
import passwordApi from '../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import InputField from '../../../components/InputField';
import StyledButton from '../../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup.string()
    .required()
    .min(8)
    .test('uppercase', 'Password must contain a Uppercase', value =>
      /^(?=.*[A-Z]).+$/.test(value),
    )
    .test('lowercase', 'Password must contain a Lowercase', value =>
      /^(?=.*[a-z]).+$/.test(value),
    )
    .test('number', 'Password must contain a Number', value =>
      /^(?=.*\d).+$/.test(value),
    )
    .test(
      'non-alphabet',
      'Password must contain a Non-alphabet character',
      value => /^(?=.*[^a-zA-Z0-9]).+$/.test(value),
    )
    .label('Password'),
    email: yup
    .string()
    .email('Please enter a valid email')
    .required('Enter your Email Address'),
  });

export default function UsePassword({navigation, route}) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleContinue = async (values, {resetForm}) => {
      setLoading(true);
      const { email, password } = values;
        const loginMethod = "Password"; 

      const response = await passwordApi.loginWithPassword(email, password, loginMethod);
      Keyboard.dismiss();
      if (!response.ok) {
        setLoading(false);
        return setErrorMessage(response.data.data.message);
      }

      await AsyncStorage.setItem('userToken', response.data.data.token);

      setLoading(false);
    //   resetForm();
      navigation.navigate('MenuLanding');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Login with Password</Text>
            </View>
            <Text style={styles.subtitle}>Provide your password to acess your account</Text>

            {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}
            
            <Formik
                initialValues={{ email: '', password: '', }}
                validationSchema={validationSchema}
                onSubmit={handleContinue}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <InputField
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
                    error={touched.email && errors.email}
                    errorMessage={errors.email}
                />

              <InputField
                label="Password"
                placeholder=""
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                errorMessage={errors.password}
                showPasswordToggle={true}
              />

              <StyledButton
                title={
                  loading ? (
                    <ActivityIndicator color="#fff"/>
                  ) : (
                    'Continue'
                  )
                }
                onPress={handleSubmit}
                width="100%"
                height={53}
                paddingVertical={10}
                marginTop={40}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                iconName="angle-right" 
                />
              </>
            )}
      </Formik>
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
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: '20%',
    },
    subtitle: {
        fontSize: 16,
        color: '#464646',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        alignSelf: 'flex-center',
      },
});