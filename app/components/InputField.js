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
  marginTop = 10,
  paddingLeft,
  error,
  errorMessage,
  showPasswordToggle,
  flex = 0,
  fullBorder = false,
  borderRadius = 0,
  paddingVertical = 4,
  backgroundColor,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const styles = getStyles(width, marginLeft, paddingLeft, flex, isFocused, fullBorder, borderRadius, paddingVertical, marginTop,  backgroundColor,);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%'}}>
      <TextInput
        style={[styles.input, error && styles.error, error && styles.errorTextColor, backgroundColor && { backgroundColor }]}
        placeholder={placeholder}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        secureTextEntry={textContentType === 'password' && !isPasswordVisible}
        onChangeText={onChangeText}
        placeholderTextColor="#8A8A8A"
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

const getStyles = (width, marginLeft, paddingLeft, flex, isFocused, fullBorder, backgroundColor,borderRadius, paddingVertical, marginTop ) =>
  StyleSheet.create({
    inputContainer: {
      flex: flex,
      width: width,
      alignItems: 'center',
      marginBottom: 10
    },
    label: {
      color: '#0E0E0E',
      fontSize: 14,
      marginTop: 15,
      fontWeight: '500',
      alignSelf: 'flex-start',
      // marginLeft: marginLeft,
    },
    input: {
      borderColor: isFocused ? '#8A8A8A' : '#CCCCCC',
      borderBottomWidth: 1,
      borderWidth: fullBorder ? 1 : 0,
      borderRadius: fullBorder ? borderRadius : 0,
      // borderBottomLeftRadius: 10,
      marginTop: marginTop,
      fontSize: 14,
      paddingVertical: paddingVertical,
      marginLeft: marginLeft,
      paddingLeft: paddingLeft,
      backgroundColor: backgroundColor || 'transparent', 
      color: '#8A8A8A',
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
    },
  });

export default InputField;
