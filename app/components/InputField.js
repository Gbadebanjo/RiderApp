import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const InputField = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  width,
  marginLeft,
  paddingLeft,
  error,
  flex = 0
}) => {
  const styles = getStyles(width, marginLeft, paddingLeft, flex);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.error]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholderTextColor="#d2d2d4"
        value={value}
        width={width}
      />
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
      marginTop: 20,
      alignSelf: 'flex-start',
      marginLeft: marginLeft,
    },
    input: {
      width: '100%',
      borderColor: '#212121',
      borderBottomWidth: 2,
      marginTop: 10,
      fontSize: 14,
    },
    error : {
      borderColor: 'red',
    },
  });

export default InputField;
