import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import { FontAwesome, Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = ({ navigation }) => {
  const [showName, setShowName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial value for sliding animation

  const toggleNameDetails = () => {
    setShowName(!showName);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.headcontainer}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="angle-left" size={24} color="black" />
          <Text style={styles.head}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nameContainer}>
          <View style={styles.Img}>
            <Image source={require('../../assets/Userpic.png')} />
            <TouchableOpacity
              style={styles.cam}
              onPress={toggleModal} // Open the modal
            >
              <Ionicons name="camera-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.namContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.account}>Individual Account</Text>
            <Text style={styles.id}>User ID: 234565456755</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          {/* <Linking>Edit</Linking> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailscontainer}
          onPress={toggleNameDetails}
        >
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Full Name</Text>
            <Text style={styles.nametext}>John Doe</Text>
          </View>
          <Entypo
            name={showName ? 'chevron-thin-up' : 'chevron-thin-down'}
            size={14}
            color="#212121"
          />
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

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modal,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          ><View style={styles.modalLineContainer}>
              <Text style={styles.modalTitle}>Edit Account Photo</Text>
            </View>
            <TouchableOpacity style={styles.modalLineContainer}>
              <Text style={styles.modalText}>Hide Profile Picture</Text>
              <FontAwesome name="user-o" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalLineContainer}>
              <Text style={styles.modalText}>Take photo</Text>
              <Feather name="camera" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={toggleModal}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;

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
    opacity: 0.8,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
  edit: {
    color: '#1B6ADF',
    fontSize: 16,
    height: '100%',
    textDecorationLine: 'underline',
  
  },
});
