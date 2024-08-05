import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const BookRide = () => {
  return (
    <SafeAreaView style={{justifyContent: "center", backgroundColor: '#000', flex: 1, alignItems: 'center'}}>
      <Text style={{color: '#fff', fontSize: 30}}>BookRide</Text>
    </SafeAreaView>
  )
}

export default BookRide

const styles = StyleSheet.create({})