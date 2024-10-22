import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

const SelectInput = ({ label, items, initialValue, placeholder, value, onValueChange, width }) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
         placeholder={{ label: initialValue || placeholder, value: initialValue || "" }}
        items={items}
        value={value}
        onValueChange={onValueChange}
        style={{
          iconContainer: {...styles.iconContainer, right: width === '90%' ? '10%' : '5%'} ,
          inputIOS: { ...styles.inputIOS, width, borderColor: isFocused ? '#212121' : '#CCCCCC'  },
          inputAndroid: { ...styles.inputAndroid, width, borderColor: isFocused ? '#212121' : '#CCCCCC'  },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <AntDesign name="down" size={13} color="gray" />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15, 
    marginBottom: 10, 
  },
  label: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 5,
    // marginLeft: 20,
  },
  inputIOS: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 10,
    // paddingHorizontal: 10,
    color: '#8A8A8A',
    // paddingRight: 40,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#8A8A8A',
    // paddingRight: 40,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  iconContainer: {
    top: 10,
    right: '10%',
  },
});

export default SelectInput;