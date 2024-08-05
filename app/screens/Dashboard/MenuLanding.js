import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

import React from 'react'

const MenuLanding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Menu</Text>
      <View>
        <Image source={require('../../assets/Userpic.png')} />
        <View>
          <Text>John Doe</Text>
          <Text>Individual Account</Text>
          <Text>User ID: 234565456755</Text>
        </View>
        <AntDesign name="right" size={14} color="#98A0B3" />
      </View>
    </SafeAreaView>
  )
}

export default MenuLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
})