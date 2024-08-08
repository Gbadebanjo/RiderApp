import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';

import React from 'react'

const MenuLanding = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>Menu</Text>
      <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.navigate('Account1')}>
        <View style={styles.Img}>
          <Image source={require('../../assets/Userpic.png')} />
        </View>
        <View style={styles.namContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.account}>Individual Account</Text>
          <Text style={styles.id}>User ID: 234565456755</Text>
        </View>
        <Entypo name="chevron-thin-right" size={14} color="#98A0B3"  />
      </TouchableOpacity>
      <View>
        <View style={styles.details}>
          <View style={styles.detailsrow}>
            <Feather name="lock" size={24} color="#D3D3D3" />
            <Text style={styles.detailname}>Wallet Vault</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </View>
          <View style={styles.detailsrow}>
            <Feather name="lock" size={24} color="#D3D3D3" />
            <Text style={styles.detailname}>Share Account</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </View>
          <View style={styles.detailsrow}>
            <Feather name="lock" size={22} color="#D3D3D3" />
            <Text style={[styles.detailname, { borderBottomWidth: 0 }]}>Booking History</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.rewards}>
        <Feather name="lock" size={24} color="#98A0B3" />
        <Text style={styles.rewardtext}>Rewards Program</Text>
        <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
      </TouchableOpacity>
        <View style={styles.details}>
          <TouchableOpacity style={styles.detailsrow}>
            <Feather name="lock" size={24} color="#98A0B3" />
            <Text style={[styles.detailname, {color: '#464646'}]}>Referral Program</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsrow}>
            <Feather name="lock" size={24} color="#98A0B3" />
            <Text style={[styles.detailname, {color: '#464646'}]}>Settings</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsrow}>
            <Feather name="lock" size={22} color="#98A0B3" />
            <Text style={[styles.detailname, {color: '#464646'}]}>Legal</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsrow}>
            <Feather name="lock" size={22} color="#98A0B3" />
            <Text style={[styles.detailname, { borderBottomWidth: 0 , color: '#464646'}]}>Logout</Text>
            <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
          </TouchableOpacity>
        </View>
    </SafeAreaView >
  )
}

export default MenuLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161718',
    alignSelf: 'center',
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
    borderRadius: 50,
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