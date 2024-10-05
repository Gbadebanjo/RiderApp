import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function SocialLogo({ text, logo, onPress, containerWidth = '20%', logoWidth = 30, logoHeight = 40 }) {
  return (
    <TouchableOpacity style={[styles.container, { width: containerWidth }]} onPress={onPress}>
      {React.isValidElement(logo) ? (
        logo
      ) : (
        <Image source={logo} style={[styles.logo, { width: logoWidth, height: logoHeight }]} />
      )}
      <Text style={styles.textIcon} >{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textIcon: {
    marginTop: 4,
    fontSize: 11,
    textAlign: 'center',
  },
});