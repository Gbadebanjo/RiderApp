import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import StyledButton from './app/components/StyledButton';
import FirstScreen from './app/screens/Signup/FirstScreen';
import CreateAccount from './app/screens/Signup/CreateAccount';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FirstScreen /> */}
      <CreateAccount/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
