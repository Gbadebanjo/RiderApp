import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StyledButton from './app/components/StyledButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <StyledButton 
        title="Click Me" 
        onPress={() => alert('Button Pressed')} 
        width="80%" 
        marginRight={10} 
        marginLeft={10} 
        marginTop={10} 
        marginBottom={10} 
        backgroundColor="#7538EC" 
        borderWidth={2} 
        borderColor="#7538EC" 
        TextColor="#fff" 
        iconName="angle-right"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
