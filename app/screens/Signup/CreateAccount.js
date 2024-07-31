// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import StyledButton from '../../components/StyledButton';
import InputField from '../../components/InputField';

const logo = require('../../assets/Logo Image.png');

export default function FirstScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create an Account</Text>

      <InputField
        label="Email"
        placeholder="user@rydepro.com"
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        returnKeyType="next"
        width="90%"
        marginLeft={15}
      />

      <StyledButton
        title="Continue"
        onPress={() => alert('Button Pressed')}
        width="85%"
        height={53}
        paddingVertical={10}
        marginTop={30}
        backgroundColor="#212121"
        borderWidth={2}
        TextColor="#fff"
        iconName="angle-right" />

      <TouchableOpacity onPress={() => alert('Continue as Guest Pressed')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});
