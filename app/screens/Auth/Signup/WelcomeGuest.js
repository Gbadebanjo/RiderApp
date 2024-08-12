import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/Logo Image.png');

export default function WelcomeGuest({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome Guest</Text>

      <View style={styles.subtexts}>
        <Text style={styles.text}>Be among the first to sign up & enjoy exclusive Rewards.</Text>
        <Text style={styles.text}>Every ride earns you cash back rewards and miles points.</Text>
        <Text style={styles.text}>Preferred alternative to rideshare or AI transportation.</Text>
      </View>

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
          onPress={() => alert('Button Pressed')}
          width="80%"
          height={53}
          paddingVertical={10}
          marginTop={10}
          backgroundColor="#fff"
          borderColor="#212121"
          TextColor="#212121"
          iconName="angle-right" />

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
    marginTop: 20,
  },
  title: {
    width: '80%',
    color: '#212121',
    fontSize: 32,
    marginTop: 60,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtexts: {
    marginTop: 10,
    width: '80%',
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
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
