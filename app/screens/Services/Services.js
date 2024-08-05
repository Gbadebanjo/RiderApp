import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Services = () => {
  return (
    <SafeAreaView style={{justifyContent: "center", backgroundColor: '#000', flex: 1, alignItems: 'center'}}>
      <Text style={{color: '#fff', fontSize: 30}}>Services</Text>
    </SafeAreaView>
  )
}

export default Services

const styles = StyleSheet.create({})