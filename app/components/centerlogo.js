import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const logo = require('../assets/Logo Image.png');

export default function Centerlogo() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center', 
    },
    logo: {
      width: 80, 
      height: 80, 
      resizeMode: 'contain',
    },
  });