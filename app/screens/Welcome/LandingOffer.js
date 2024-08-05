import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'
import Centerlogo from '../../components/centerlogo';
import StyledButton from '../../components/StyledButton';

export default function LandingOffer({ navigation }) {

  const offers = [
    { image: require('../../assets/SpecialOffer1.png'), texthead: 'Sign up as an Early Access Rider', textbody: 'Get 15% off your first 30 rides! Limited-time offer.' },
    { image: require('../../assets/SpecialOffer2.png'), texthead: 'Refer Friends, Earn More!', textbody: 'Refer a Friend and Recieve an extra 15% off your next 20 rides.' },
    { image: require('../../assets/SpecialOffer3.png'), texthead: 'Cash Back & Miles Points', textbody: 'Cash Baack on Every Ride! Earn cashback and miles points with RYDEPRO.' },
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((currentOffer + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentOffer]);

  return (
    <SafeAreaView style={styles.container}>
      <Centerlogo />
      <View style={styles.Img}>
        <Image source={offers[currentOffer].image} style={styles.picture} />
      </View>
      <Text style={styles.texthead}>{offers[currentOffer].texthead}</Text>
      <Text style={styles.textbody}>{offers[currentOffer].textbody}</Text>
      <View style={styles.button}>
      <StyledButton title="Skip" onPress={() => navigation.navigate('FirstScreen')} width="90%" height={53} paddingVertical={10} marginTop={170} iconName="angle-right" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
  },
  Img: {
    paddingHorizontal: 15,
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
    resizeMode: 'contain',
  },
  texthead: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  textbody: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
    color: '#464646',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
})