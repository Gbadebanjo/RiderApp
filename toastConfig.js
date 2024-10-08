import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', borderLeftWidth: 0, alignItems: 'center', paddingLeft: 20 }}
      contentContainerStyle={{ paddingHorizontal: 25 }}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold',
        flexWrap: 'wrap',
      }}
      text2Style={{
        fontSize: 13,
        color: 'green',
        width: '100%',
        flexWrap: 'wrap',
        fontWeight: 'bold'
      }}
      renderLeadingIcon={() => <Icon name="check-circle" size={30} color="green" />}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderRightColor: 'red', borderLeftWidth: 0, alignItems: 'center', paddingLeft: 20 }}
      contentContainerStyle={{ paddingHorizontal: 25, width: '100%' }}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 13,
        color: 'red',
        width: '100%',
        flexWrap: 'wrap',
        fontWeight: 'bold',
      }}
      renderLeadingIcon={() => <Icon name="times-circle" size={30} color="red" />}
    />
  ),
};