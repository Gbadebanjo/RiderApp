import { StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';

const WelcomeHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor='#212121' translucent={false} />
      <LinearGradient
        colors={['#212121', '#212121', '#ffffff', '#ffffff']} // Black to White
        locations={[0, 0.55, 0.55, 1]} // Define the color stops
        start={{ x: 0, y: 0 }} // Gradient from top to bottom
        end={{ x: 0, y: 1 }}
        style={styles.top}
      >
        <View style={styles.accountHeader}>
          <View style={styles.imageBox}>
            <Image
              source={require('../../assets/Userpic.png')}
              style={styles.image}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.nameBox}>
            <Text style={{ color: '#fff', fontSize: 20 }}>Welcome</Text>
            <Text style={{ color: '#fff', fontSize: 17 }}>Raymond Badmus</Text>
          </View>
          <TouchableOpacity style={styles.notification}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <View style={styles.firstHead}>
            <Text style={styles.titleText}>Book a Ride</Text>
            <Text style={styles.subText}>One-way</Text>
          </View>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    marginBottom: 0,
    paddingBottom: 0,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  imageBox: {
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cameraIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.8,
    bottom: -6,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBox: {
    flex: 1,
    marginLeft: 20,
    gap: 7,
  },
  notification: {
    marginLeft: 20,
    backgroundColor: '#464646',
    padding: 9,
    borderRadius: 20,
  },
  box: {
    width: '86%',
    height: '65%',
    backgroundColor: '#f9f9f9',
    marginTop: 45,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  firstHead: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#909090',
  },
  subText: {
    fontSize: 16,
    fontWeight: '500', 
    color: '#909090',
  },
});
