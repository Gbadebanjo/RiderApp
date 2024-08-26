import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const BookRide = () => {
  const [userDetails, setUserDetails] = useState(null);

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('userToken');
  //       if (!token) {
  //         console.log('Authorization token not found.');
  //         return;
  //       }
  //       const response = await axios.get('https://api-auth.katabenterprises.com/api/dashboard/rider/details', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.data.success) {
  //         console.log('User Details:', response.data.data);
  //         setUserDetails(response.data.data);
  //         console.log('userDetails:', response.data.data);
  //         console.log('Raw API Response:', response.data);
  //         console.log('Profile Pic1:', response.data.data.profilePic);
  //       } else {
  //         console.log('Failed to fetch user details.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user details:', error);
  //       console.log('An error occurred while fetching user details.');
  //     }
  //   };
  //   fetchUserDetails();
  // }, []);

  return (
    <SafeAreaView style={{justifyContent: "center", backgroundColor: '#000', flex: 1, alignItems: 'center'}}>
      <Text style={{color: '#fff', fontSize: 30}}>BookRide</Text>
    </SafeAreaView>
  )
}

export default BookRide

const styles = StyleSheet.create({})