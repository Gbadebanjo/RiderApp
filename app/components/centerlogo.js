import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const logo = require('../assets/Logo Image.png');

export default function Centerlogo({ align }) {
    return (
      <View style={[styles.container, align === 'left' ? styles.alignLeft : styles.alignCenter]}>
        <Image source={logo} style={styles.logo} />
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
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },
  });