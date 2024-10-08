import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';

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
        <View style={styles.topContent}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> navigation.goBack()}>
                <MaterialIcons name="keyboard-backspace" size={24} color={'black'}/>
                    <Text> Back</Text>
            </TouchableOpacity>
            <Centerlogo logoWidth='100%' logoHeight= '50%' style={styles.logo}/>
        </View>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Account Recovery</Text>
            <Formik
                initialValues={{ email: ''  }}
                validationSchema={validationSchema}
                onSubmit={handleContinue}
            >
                {({ handleChange, handleBlur, handleContinue, values, errors, touched }) => (
                <>
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
    topContent: {
        // flexDirection: 'row',
        // paddingTop: '5%',
        backgroundColor: 'red',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    title: {

    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
})