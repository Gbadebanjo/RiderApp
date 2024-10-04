import { StyleSheet, Text, View, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import InputField from '../../components/InputField';
import StyledButton from '../../components/StyledButton';
import React from 'react';
import { AutoFocus } from 'expo-camera/build/legacy/Camera.types';

const WelcomeHome = () => {
  return (
    <LinearGradient
      colors={['#212121', '#212121', '#ffffff', '#ffffff']} // Black to White
      locations={[0, 0.55, 0.55, 1]} // Define the color stops
      start={{ x: 0, y: 0 }} // Gradient from top to bottom
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor='#212121' translucent={false} />
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <Text style={styles.subText}>One-way</Text>
              <Ionicons name="chevron-down" size={18} color="#909090" />
            </View>
          </View>
          <InputField
            label="From"
            placeholder="Choose Pickup location"
            textContentType="location"
            returnKeyType="next"
            width="90%"
            marginLeft={30}
            marginTop={0}
          />
          <InputField
            label="To"
            placeholder="Choose Destination"
            textContentType="location"
            returnKeyType="next"
            width="90%"
            marginLeft={30}
            marginTop={0}
          />
          <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
            <InputField
              label="Date and Time"
              placeholder="Date and Time"
              textContentType="location"
              returnKeyType="next"
              width="70%"
              marginLeft={-10}
              marginTop={0}
            />
            <InputField
              label="Passengers"
              placeholder="Select Options"
              textContentType="location"
              returnKeyType="next"
              width="70%"
              marginLeft={-60}
              marginTop={0}
            />
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
            <InputField
              label="Stops (Optional)"
              placeholder="Address, Airport, Hotel"
              textContentType="location"
              returnKeyType="next"
              width="70%"
              marginLeft={-10}
              marginTop={0}
            />
            <InputField
              label="Stops (Optional)"
              placeholder="Address, Airport, Hotel"
              textContentType="location"
              returnKeyType="next"
              width="70%"
              marginLeft={-60}
              marginTop={0}
            />
          </View>
          <StyledButton
            title="Book Ride"
            marginTop={10}
            backgroundColor={'#909090'}
            width="80%"
            marginLeft={40}
            paddingVertical={10}
            borderRadius={20}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingHorizontal: 20, gap: 5 }}>
            <Text style={{ color: '#909090', fontSize: 16 }}>Locked</Text>
            <MaterialCommunityIcons name="toggle-switch-outline" size={18} color="#cf3b30" />
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 15, justifyContent: 'space-between', paddingHorizontal: 40, width: '100%' }}>
          <Text style={{ color: '#000', fontSize: 18 }}>Ride Details</Text>
          <Text style={{ color: '#909090', fontSize: 16, textDecorationLine: 'underline', }}>See all</Text>
        </View>
        <View style={styles.comingSoon}>
          <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Coming Soon</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
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
    height: '70%',
    backgroundColor: '#f9f9f9',
    marginTop: 38,
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
  comingSoon: {
    width: '80%',
    height: '12%',
    backgroundColor: '#212121',
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
});