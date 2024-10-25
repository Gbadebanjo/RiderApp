import React, { useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, StatusBar, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserLocation({navigation}){ 
  const [isDeniedModalVisible, setDeniedModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const permissionStatus = await AsyncStorage.getItem('locationPermissionStatus');
    if (permissionStatus === 'granted') {
      handleLocationAccess();
    } else {
      requestLocationPermission();
    }
  };
  
  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setDeniedModalVisible(true);
        await AsyncStorage.setItem('locationPermissionStatus', 'denied');
      } else {
        await AsyncStorage.setItem('locationPermissionStatus', 'granted');
        handleLocationAccess();
      }
    } catch (error) {
        console.log('herrerer')
        console.error('Error requesting location permission:', error);
    } 
  };

  const handleLocationAccess = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);

      if (address.length > 0) {
        const { country, region: state, city, postalCode: zipCode } = address[0];
        const { latitude, longitude } = location.coords;
        const locationInfo = { country, state, city, zipCode, latitude, longitude };

        console.log('Location Details:', locationInfo);
        setLocationDetails(locationInfo);
        await AsyncStorage.setItem('userLocation', JSON.stringify(locationInfo));
        navigation.navigate("Language")
      }
    } catch (error) {
      console.error('Error accessing location:', error);
      if (error.message.includes('Not authorized to use location services')) {
        setDeniedModalVisible(true);
      }
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor="#fff" />
      <Modal
        isVisible={isDeniedModalVisible}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Location Denied
          </Text>
          <Text style={styles.modalText}>
            Location access is required to use this app. Please enable location permissions in your settings.
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
              setDeniedModalVisible(false);
            }}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsButtonText}>Go to Settings</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#262626',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: '#D21B34',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '90%',
    marginLeft: '5%'
  },
  settingsButton: {
    borderTopWidth: 1,
    borderTopColor: '#545458A6',
    paddingTop: 10,
    borderRadius: 5,
  },
  settingsButtonText: {
    color: '#0A84FF',
    textAlign: 'center',
    fontSize: 18,
  },
});