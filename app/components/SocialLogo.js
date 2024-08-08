import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function SocialLogo({ text, logo }) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text>{text}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center', 
    },
    logo: {
      width: 30, 
      height: 40,
      resizeMode: 'contain',
    },
  });