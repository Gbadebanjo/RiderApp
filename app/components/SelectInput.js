import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

const SelectInput = ({ label, items, placeholder, onValueChange, width }) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
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
    color: '#212121',
    // paddingRight: 40,
    borderBottomWidth: 2,
    // marginLeft: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 40,
    borderWidth: 2,
    // marginLeft: 20,
  },
  iconContainer: {
    top: 16,
    right: '10%',
  },
});

export default SelectInput;