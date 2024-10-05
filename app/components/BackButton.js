import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style, iconSize = 26, iconColor = 'black' }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.goBack()}>
      {/* <Entypo name="chevron-small-left" size={iconSize} color={iconColor} /> */}
      <MaterialIcons name="keyboard-backspace" size={iconSize} color={iconColor}/>
    </TouchableOpacity>
  );
};

export default BackButton;