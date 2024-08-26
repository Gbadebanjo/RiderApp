import React, {useRef, useState} from 'react';
import api from '../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';

const validationSchema = yup.object().shape({
    code: yup
      .string()
      .length(4, 'Code must be exactly 4 digits')
      .required('Enter the 4-digit code'),
  });
  
const CELL_COUNT = 4;

export default function Pin({navigation, route}) {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { email } = route.params;

    const handleSave = async (values) => {
        setLoading(true);
    
        console.log(values.code);
        const response = await api.createPincode(email, values.code);
        Keyboard.dismiss();
        if (!response.ok) {
          setLoading(false);
          Alert.alert(response.data.message);
          return setErrorMessage(response.data.message);
        }
    
        setLoading(false);
        Alert.alert(response.data.message);
        return navigation.navigate('Feedback');
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Pin</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate()}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Create a 4 Digit pin</Text>  

            {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

            <View style={styles.mainContent}>
                <View>
                    <Text style={styles.subTitle}>New Pincode</Text>  
                    <Formik
                        initialValues={{ code: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSave}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={values.code}
                                onChangeText={handleChange('code')}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                // keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                onSubmitEditing={handleSubmit} 
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
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                                )}
                                />
                            {touched.code && errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
                        </>
                        )}
                    </Formik>
                </View>

                <StyledButton
                    title="Save"
                    loading={loading}
                    onPress={handleSave}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    iconName="angle-right" 
                    />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        alignSelf: 'center',
    },
    mainContent: {
        marginTop: 50,
        width: '100%',
    },
    logoText:{
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        alignSelf: 'center',
    },
    codeFieldRoot: {
        // marginTop: 10,
        width: '80%',
        alignSelf: 'center',
      },
      cell: {
        width: 40,
        height: 40,
        marginTop: 20,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#CCCCCC',
        textAlign: 'center',
      },
      focusCell: {
        borderColor: '#000000',
      },
      completeCell: {
        borderColor: '#000000',
    },
      inputText: {
        color: 'black', 
        fontSize: 18,
      },
      errorText: {
        color: 'red',
      }
});