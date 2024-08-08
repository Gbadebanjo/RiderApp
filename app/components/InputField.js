import React, { useState }  from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const InputField = ({
  label,
  placeholder,
  textContentType,
  onChangeText,
  returnKeyType,
  value,
  width,
  marginLeft,
  paddingLeft,
  error,
  errorMessage,
  showPasswordToggle,
  flex = 0
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const styles = getStyles(width, marginLeft, paddingLeft, flex);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center',}}>
      <TextInput
        style={[styles.input, error && styles.error, error && styles.errorTextColor]}
        placeholder={placeholder}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        secureTextEntry={textContentType === 'password' && !isPasswordVisible}
        onChangeText={onChangeText}
        placeholderTextColor="#d2d2d4"
        value={value}
        width={width}
        />
          {showPasswordToggle && textContentType === 'password' && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
            <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} />
          </TouchableOpacity>
        )}
       </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const getStyles = (width, marginLeft, paddingLeft, flex ) =>
  StyleSheet.create({
    inputContainer: {
      flex: flex,
      width: width,
      alignItems: 'center',
      marginBottom: 10
    },
    label: {
      color: '#212121',
      fontSize: 18,
      marginTop: 15,
      alignSelf: 'flex-start',
      // marginLeft: marginLeft,
    },
    input: {
      // width: '100%',
      borderColor: '#212121',
      borderBottomWidth: 2,
      marginTop: 10,
      fontSize: 14,
      marginLeft: marginLeft,
    },
    error : {
      borderColor: 'red',
    },
    errorTextColor: {
      color: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
      alignSelf: 'flex-start',
      marginLeft: marginLeft,
    },
    eyeIconContainer: {
      right: 30,
      top: 2,
    },
  });

export default InputField;
