import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import '../../components/StyledButton';
import StyledButton from '../../components/StyledButton';
import {FontAwesome } from '@expo/vector-icons';

export default function Onboarding({ navigation }) {
  const [loading, setLoading] = useState(false);

  return (
  <ImageBackground source={require('../../assets/About us.jpeg')} style={styles.background}>
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        <View  style={styles.mainTexts}>
          <View style={styles.texts1}>
            <Text style={styles.texthead}>Earn Cash Back and Miles Points</Text>
            <Text style={styles.textbody}>
                <Text style={styles.spantext}>Cash Back: </Text>
              Earn a percentage of your fare back
            </Text>
            <Text style={styles.textbody}>
                <Text style={styles.spantext}>Miles Points: </Text>
              Get points for every mile traveled.
            </Text>
          </View>
          <View style={styles.texts1}>
            <Text style={styles.texthead}>Exclusive Rider Discount</Text>
            <Text style={styles.textbody}>Sign up as an Early Access Rider. Get 15% off your first 30 rides! Limited-time offer.</Text>
          </View>
          <View style={styles.texts}>
            <Text style={styles.texthead}>Refer Friends, Earn More!</Text>
            <Text style={styles.textbody}>For each friend you refer, you’ll get an extra 15% off your next 20 rides</Text>
          </View>
        </View>
        
        <StyledButton
          title={
          loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              'Get Started'
            )
           }
          onPress={() => navigation.navigate('FirstScreen')}
          width="85%"
          height={55}
          paddingVertical={10}
          marginTop={40}
          backgroundColor="#D0D0D0"
          borderWidth={0}
          TextColor="#0E0E0E"
          borderRadius={10}
        />

        <View style={styles.bottomContainer}>
          <Text style={styles.unitedText}>United States of America</Text>
          <Text style={styles.bottomtexts}>Veteran Owned Business</Text>
          <Text>
            <FontAwesome name="registered" size={14} color="#1f1f1f" />
            <Text style={styles.bottomtexts}> 2024 RYDEPRO, </Text>
            <Text style={styles.bottomtexts}>All Rights Reserved</Text>
          </Text>
        </View>
    </SafeAreaView>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  texts1: {
    alignItems: 'center',
    width: '100%',
    marginBottom: '10%',
  },
  mainTexts: {
    marginTop: '30%',
    alignItems: 'center',
    width: '100%',
  },
  texts: {
    alignItems: 'center',
    width: '100%',
  },
  texthead: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: '2%',
    textAlign: 'center',
    color: '#FCFCFC',
  },
  textbody: {
    fontWeight: '400',
    width: '80%',
    fontSize: 16,
    textAlign: 'center',
    color: '#DADADA',
    marginBottom: '2%',
  },
  spantext: {
    fontWeight: '700',
    width: '90%',
    fontSize: 16,
    textAlign: 'center',
    color: '#DADADA',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  bottomtexts: {
    color: '#1f1f1f',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: '2%'
  },
  unitedText: {
    fontSize: 14,
    color: '#1f1f1f',
    textAlign: 'center',
    marginBottom: '2%'
  },
})