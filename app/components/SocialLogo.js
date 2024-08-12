import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function SocialLogo({ text, logo, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {React.isValidElement(logo) ? (
        logo
      ) : (
        <Image source={logo} style={styles.logo} />
      )}
      <Text style={styles.textIcon} >{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  logo: {
    // marginTop: 10,
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
  textIcon: {
    marginTop: 4,
    fontSize: 11,
  },
});