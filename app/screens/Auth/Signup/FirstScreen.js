import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/Logo Image.png');

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>New Era of On Demand Transportation.</Text>
      <View style={styles.buttonContainer}>
        <StyledButton
          title="Create an Account"
          onPress={() => navigation.navigate('CreateAccount')}
          width="80%"
          height={53}
          paddingVertical={10}
          marginTop={10}
          backgroundColor="#212121"
          borderWidth={2}
          TextColor="#fff"
          iconName="angle-right" />

        <StyledButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          width="80%"
          height={53}
          paddingVertical={10}
          marginTop={10}
          backgroundColor="#fff"
          borderColor="#212121"
          borderWidth={1}
          TextColor="#212121"
          iconName="angle-right" />

        <TouchableOpacity onPress={() => navigation.navigate('WelcomeGuest')}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 40,
  },
  logo: {
    marginTop: 30,
  },
  title: {
    width: '80%',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  guestText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
});
