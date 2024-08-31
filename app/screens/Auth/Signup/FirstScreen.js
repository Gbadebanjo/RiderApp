import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../../../components/StyledButton';

const logo = require('../../../assets/Logo Image.png');

export default function FirstScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const requestLocationPermission = async (type) => {
    setModalVisible(false);
    let status;
    if (type === 'once') {
      status = (await Location.requestForegroundPermissionsAsync()).status;
    } else if (type === 'always') {
      status = (await Location.requestBackgroundPermissionsAsync()).status;
    }

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);

    if (address.length > 0) {
      const { country, region: state, city, postalCode: zipCode } = address[0];
      const locationDetails = { country, state, city, zipCode };
      console.log('Location Details:', locationDetails);
      await AsyncStorage.setItem('userLocation', JSON.stringify(locationDetails));
    }
  };

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Turn your location on</Text>
            <Text style={styles.modalText}>
              Unlock personalized ride options, promotions, and efficient service availability by enabling location services.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonOnce]}
                onPress={() => requestLocationPermission('once')}
              >
                <Text style={styles.textStyle}>Allow Once</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonOK]}
                onPress={() => requestLocationPermission('always')}
              >
                <Text style={styles.textStyle}>Always Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Don't Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 40,
    width: '100%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: '95%',
    backgroundColor: '#212121',
    borderRadius: 15,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  modalText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  modalButtons: {
    width: '100%',
  },
  button: {
    padding: 2, 
  },
  buttonCancel: {
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    padding: 10,
  },
  buttonOK: {
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
  },
  buttonOnce: {
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderTopWidth: 1,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});