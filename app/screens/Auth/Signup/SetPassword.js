import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import InputField from '../../../components/InputField';
import StyledButton from '../../../components/StyledButton';
import { Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup.string()
    .required()
    .min(6)
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
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Confirm Password'),
  });

export default function SetPassword({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Password</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Your Password must be at least 8 characters long, and contain at least one digit and one special character</Text>
            
            <Formik
                initialValues={{ password: '', confirmPassword: '', }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                navigation.navigate('MenuLanding');
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
              <InputField
                label="New Password"
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
                marginLeft={20}
              />

              <InputField
                label="Confirm Password"
                placeholder=""
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                showPasswordToggle={true}
                marginLeft={20}
              />
              <StyledButton
                title="Update"
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
        paddingHorizontal: 15,
        width: '100%',
    },
    titleContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 16,
        color: '#464646',
        marginTop: 10,
    },
});