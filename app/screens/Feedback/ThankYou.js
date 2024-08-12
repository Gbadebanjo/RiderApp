// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../components/StyledButton';
import Centerlogo from '../../components/centerlogo';
const image = require('./../../assets/rafiki.png');

export default function ThankYou({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Centerlogo align="left"/>
        <View>
            <Image source={image} style={styles.image} />

            <Text style={styles.title}>Thanks for Being an Early! </Text>
            <Text style={styles.subTitle}>Don’t Miss Out! Verify Your Email for Exclusive Promotions.</Text>

                <StyledButton
                    title="Return to Menu Tabs"
                    onPress={() => navigation.navigate('MenuLanding')}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    iconName="angle-right" 
                />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  Icon: {
    alignSelf: 'flex-start',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    marginTop: 40,
    fontWeight: '600',
    alignSelf: 'center',
    // marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    marginBottom: 30,
  },
  image: {
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
