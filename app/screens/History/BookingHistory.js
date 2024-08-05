import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const BookingHistory = () => {
  return (
    <SafeAreaView style={{justifyContent: "center", backgroundColor: '#000', flex: 1, alignItems: 'center'}}>
      <Text style={{color: '#fff', fontSize: 30}}>BookingHistory</Text>
    </SafeAreaView>
  )
}

export default BookingHistory

const styles = StyleSheet.create({})