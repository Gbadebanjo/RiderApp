import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Alert, Animated, Linking, Platform } from 'react-native';
import Logo from '../../assets/newRydeproLogo.png';
import * as Location from 'expo-location';

const Landing = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  // const requestLocationPermission = async () => {
  //   setBackgroundColor('#000')
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     Alert.alert(
  //       'Location Denied',
  //       'Location access is required to use this app. Please enable location permissions in your settings.',
  //       [
  //         {
  //           text: 'Go to Settings',
  //           onPress: () => {
  //             if (Platform.OS === 'ios') {
  //               Linking.openURL('app-settings:');
  //             } else {
  //               Linking.openSettings(); 
  //             }
  //             setBackgroundColor('#fff')
  //           },
  //         },
  //       ]
  //     );
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   let address = await Location.reverseGeocodeAsync(location.coords);

  //   if (address.length > 0) {
  //     const { country, region: state, city, postalCode: zipCode } = address[0];
  //     const { latitude, longitude } = location.coords;
  //     const locationDetails = { country, state, city, zipCode, latitude, longitude };
  //     console.log('Location Details:', locationDetails);
  //     await AsyncStorage.setItem('userLocation', JSON.stringify(locationDetails));
  //   }
  //   setBackgroundColor('#fff'); 
  // };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 2000, 
      useNativeDriver: true, 
    }).start();

    const timeout = setTimeout(() => {
        navigation.navigate('UserLocation');
        // requestLocationPermission();
        // alert('Successfully navigated to Onboarding');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={{ opacity: fadeAnim }}>
      <Image source={Logo} style={{ width: '40%', height: undefined, aspectRatio: 1, resizeMode: 'contain' }} /> 
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;
