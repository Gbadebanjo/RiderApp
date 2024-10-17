import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Language({navigation}) {
  return (
      <View>
          <Text>Language</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Onboarding')}>
              <Text>Next</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})