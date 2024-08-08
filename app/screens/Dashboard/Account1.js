import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'

const Account1 = ({ navigation }) => {
  const [showName, setShowName] = useState(false);

  const toggleNameDetails = () => {
    setShowName(!showName);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.headcontainer} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={24} color="black"  />
          <Text style={styles.head}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nameContainer} >
          <View style={styles.Img}>
            <Image source={require('../../assets/Userpic.png')} />
            <View style={styles.cam} >
              <Ionicons name='camera-outline' size={22} color='#fff' />
            </View>
          </View>
          <View style={styles.namContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.account}>Individual Account</Text>
            <Text style={styles.id}>User ID: 234565456755</Text>
          </View>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailscontainer} onPress={toggleNameDetails}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Full Name</Text>
            <Text style={styles.nametext}>John Doe</Text>
          </View>
          <Entypo name={showName ? "chevron-thin-up" : "chevron-thin-down"}
            size={14} color="#212121" />
        </TouchableOpacity>
        {showName && (
          <>
            <View style={styles.detailscontainer}>
              <View style={styles.namedetails}>
                <Text style={styles.namehead}>First Name</Text>
                <Text style={styles.nametext}>John</Text>
              </View>
            </View>
            <View style={styles.detailscontainer}>
              <View style={styles.namedetails}>
                <Text style={styles.namehead}>Last Name</Text>
                <Text style={styles.nametext}>Doe</Text>
              </View>
            </View>
          </>
        )}
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Display Name(Alias)</Text>
            <Text style={styles.nametext}>JohnnyD</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Phone Number</Text>
            <Text style={styles.nametext}>+235 5767465787</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Email Address</Text>
            <Text style={styles.nametext}>jhon.mobbb@gmail.com</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Emergency Contact</Text>
            <Text style={styles.nametext}>Moses Gabriel</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Emergency Number</Text>
            <Text style={styles.nametext}>+111 4567874563</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Account1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  headcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  head: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161718',
    textAlign: 'center',
    flex: 1,
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
    position: 'relative',
    borderRadius: 50,
  },
  cam: {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'absolute',
    opacity: 0.6,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  detailscontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    width: '100%',
    height: 65,
    marginTop: 20,
  },
  namedetails: {
    flex: 1,
    gap: 7,
  },
  namehead: {
    fontSize: 20,
    color: '#212121',
    fontWeight: '600',
  },
  nametext: {
    fontSize: 14,
    color: '#464646',
  },

})