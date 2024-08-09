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
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const styles = getStyles(width, marginLeft, paddingLeft, flex, isFocused);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%'}}>
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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

const getStyles = (width, marginLeft, paddingLeft, flex, isFocused ) =>
  StyleSheet.create({
    inputContainer: {
      flex: flex,
      width: width,
      alignItems: 'center',
      marginBottom: 10
    },
    label: {
      color: '#212121',
      fontSize: 16,
      marginTop: 15,
      alignSelf: 'flex-start',
      marginLeft: marginLeft,
    },
    input: {
      // width: '100%',
      borderColor: isFocused ? '#212121' : '#CCCCCC',
      borderBottomWidth: 2,
      marginTop: 10,
      fontSize: 14,
      paddingVertical: 5,
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
      marginBottom: 4
      // top: 2,
      // bottom: ,
    },
  });

export default InputField;
