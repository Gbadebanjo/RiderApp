import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Entypo, FontAwesome6, FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { dashboardClient, setAuthToken } from '../../api/client';

const MenuLanding = ({ navigation }) => {
  const [showReferral, setShowReferral] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleReferral = () => {
    setShowReferral(!showReferral);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  useFocusEffect(
    React.useCallback(() => { 
      const fetchUserDetails = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('userToken');
          if (!token) {
            Alert.alert('Error', 'Authorization token not found.');
            return;
          }
          setAuthToken(token);
          const response = await dashboardClient.get('/details');
          console.log('Response:', response);
          if (response.ok) {
            setUserDetails(response.data.data);
          } else {
            Alert.alert('Error', 'Failed to fetch user details.');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          Alert.alert('Error', 'An error occurred while fetching user details.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserDetails();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#212121" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.head}>Menu</Text>
        <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate('Account', { userDetails })}>
          <View style={styles.Img}>
            <Image source={userDetails?.profilePic ? { uri: userDetails.profilePic } : require('../../assets/Userpic.png')}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
          </View>
          <View style={styles.namContainer}>
            <Text style={styles.name}>{userDetails?.displayName} </Text>
            <Text style={styles.account}>{userDetails?.accountType} Account</Text>
            <Text style={styles.id}>User ID: {userDetails?.accountNumber}</Text>
          </View>
          <Entypo name={"chevron-thin-right"}
            size={14} color="#98A0B3" />
        </TouchableOpacity>
        <View>
          <View style={styles.details}>
            <View style={styles.detailsrow}>
              <MaterialCommunityIcons name="lock-off-outline" size={24} color='#D3D3D3' />
              <Text style={styles.detailname}>Wallet Vault</Text>
              <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
            </View>
            <View style={styles.detailsrow}>
              <MaterialCommunityIcons name="lock-off-outline" size={24} color='#D3D3D3' />
              <Text style={styles.detailname}>Share Account</Text>
              <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
            </View>
            <View style={styles.detailsrow}>
              <MaterialCommunityIcons name="lock-off-outline" size={24} color='#D3D3D3' />
              <Text style={[styles.detailname, { borderBottomWidth: 0 }]}>Booking History</Text>
              <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('RewardProgram')}
          style={styles.rewards}
        >
          <FontAwesome6 name="hand-holding-dollar" size={24} color="#212121" />
          <Text style={styles.rewardtext}>Rewards Program</Text>
          <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
        </TouchableOpacity>
        <View style={styles.details}>
          <TouchableOpacity style={styles.detailsrow} onPress={toggleReferral} >
            <FontAwesome5 name="people-arrows" size={24} color="#212121" />
            <Text style={[styles.detailname, { color: '#464646' }]}>Referral Program</Text>
            <Entypo name={showReferral ? 'chevron-thin-up' : 'chevron-thin-down'} size={14} color="#98A0B3" />
          </TouchableOpacity>
          {showReferral &&
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('TrackReferral')}
                style={styles.detailsrow2}>
                <Text style={[styles.detailname, { color: '#464646', fontSize: 15 }]}>Track Referral</Text>
                <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('InviteReferral', { userDetails })}
                style={styles.detailsrow2}>
                <Text style={[styles.detailname, { color: '#464646', fontSize: 15 }]}>Invite Referral</Text>
                <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
              </TouchableOpacity>
            </>
          }
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.detailsrow}>
            <Feather name="settings" size={24} color="#212121" />
            <Text style={[styles.detailname, { color: '#464646' }]}>Settings</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsrow}>
            <Octicons name="law" size={22} color="#212121" />
            <Text style={[styles.detailname, { color: '#464646' }]}>Legal</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsrow}>
            <MaterialCommunityIcons name="logout" size={22} color="#212121" />
            <Text style={[styles.detailname, { borderBottomWidth: 0, color: '#464646' }]}>Logout</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

export default MenuLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161718',
    alignSelf: 'center',
    paddingTop: 30,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    width: '100%',
    height: 110,
    marginTop: 20,
  },
  Img: {
    // borderRadius: 50,
  },
  namContainer: {
    marginLeft: 20,
    flex: 1,
    gap: 7,
    color: '#212121',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  account: {
    fontSize: 14,
  },
  id: {
    fontSize: 14,
    color: '#464646',
  },
  details: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  detailsrow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  detailsrow2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 20,
  },
  detailname: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    color: '#D3D3D3',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#98A0B3',
  },
  rewards: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  rewardtext: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    color: '#464646',
  }
})