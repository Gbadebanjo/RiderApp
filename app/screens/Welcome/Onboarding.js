import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react'

export default function Onboarding({ navigation }) {

  const offers = [
    { image: require('../../assets/ridersDiscount.png'), texthead: 'Exclusive Rider Discount', textbody: 'Sign up as an Early Access Rider and get 15% off your first 30 rides!', textbody2: 'Limited-time offer.' },
    { image: require('../../assets/cardriving.png'), texthead: 'Refer Friends, Earn More!', textbody: 'Sign up as an Early Access Rider and get 15% off your first 30 rides!', textbody2: 'Limited-time offer.' },
    { image: require('../../assets/coins.png'), texthead: 'Cash Back and Miles Points', textbody: 'Cash Back on Every Ride! Earn cashback and miles points with RYDEPRO.' },
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
      <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')} style={styles.skipContainer}>
      <Text style={styles.skip} >Skip</Text>
      </TouchableOpacity>
      <View style={styles.Img}>
        <Image source={offers[currentOffer].image} style={styles.picture} />
      </View>
      <View style={styles.texts}>
      <Text style={styles.texthead}>{offers[currentOffer].texthead}</Text>
      <Text style={styles.textbody}>{offers[currentOffer].textbody}</Text>
      <Text style={styles.textbody}>{offers[currentOffer].textbody2}</Text>
      </View>
      <View style={styles.circlesContainer}>
        {offers.map((_, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              currentOffer === index && styles.activeCircle,
            ]}
          />
        ))}
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
    paddingTop: 10,
  },
  skipContainer: {
    width: '92%',
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#0F0D7E',
  },
  skip: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#0F0D7E',
  },
  Img: {
    paddingHorizontal: 15,
    marginTop: 70,
    width: '100%',
    alignItems: 'center',
  },
  picture: {
    width: '95%',
    resizeMode: 'contain',
  },
  texts: {
    marginTop: 100,
    width: '100%',
  },
  texthead: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'start',
    paddingHorizontal: 15,
  },
  textbody: {
    width: '90%',
    fontSize: 16,
    textAlign: 'start',
    paddingHorizontal: 15,
    color: '#0A0954',
  },
  circlesContainer: {
    flexDirection: 'row',
    marginTop: 70,
    marginBottom: 20,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 2,
  },
  activeCircle: {
    backgroundColor: '#000',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
})