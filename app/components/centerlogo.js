import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

const defaultLogo = require('../assets/newRydeproLogo.png');

export default function Centerlogo({ align, logoSource = defaultLogo, logoWidth = 80, logoHeight = 80 }) {
  return (
    <View style={[styles.container, align === 'left' ? styles.alignLeft : styles.alignCenter]}>
      <Image source={logoSource} style={[styles.logo, { width: logoWidth, height: logoHeight }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  alignLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logo: {
    resizeMode: 'contain',
  },
});