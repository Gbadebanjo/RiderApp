import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ style, iconSize = 18, iconColor = 'black' }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-sharp" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default BackButton;