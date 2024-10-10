import React, { useState, useRef, useContext } from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome, Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../context/AppContext';

const Account = ({ navigation, route }) => {
  const { userDetails } = useContext(AppContext);
  const [showName, setShowName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isProfilePicHidden, setIsProfilePicHidden] = useState(false); // State to manage profile picture visibility
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

  const hideProfilePicture = () => {
    setIsProfilePicHidden(true);
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headcontainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesome name="angle-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.head}>Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nameContainer}>
          <View style={styles.Img}>
            <Image source={isProfilePicHidden || !userDetails?.profileImg ? require('../../assets/ProfileTemplate.png') : { uri: userDetails.profileImg }}
              style={{ width: 80, height: 80, borderRadius: 50 }} />
            <TouchableOpacity
              style={styles.cam}
              onPress={toggleModal} // Open the modal
            >
              <Ionicons name="camera-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.namContainer}>
            <Text style={styles.name}>{userDetails.firstName} {userDetails.lastName}</Text>
            <Text style={styles.account}>{userDetails.accountType}</Text>
            <Text style={styles.id}>User ID: {userDetails.accountId}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailscontainer}
          onPress={toggleNameDetails}
        >
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Name</Text>
            <Text style={styles.nametext}>{userDetails.firstName} {userDetails.lastName}</Text>
          </View>
          <Ionicons
            name={showName ? 'chevron-up' : 'chevron-down'}
            size={14}
            color="#000"
          />
        </TouchableOpacity>
        {showName && (
          <>
            <View style={styles.detailscontainer}>
              <View style={styles.namedetails}>
                <Text style={styles.namehead}>First Name</Text>
                <Text style={styles.nametext}>{userDetails.firstName}</Text>
              </View>
            </View>
            <View style={styles.detailscontainer}>
              <View style={styles.namedetails}>
                <Text style={styles.namehead}>Last Name</Text>
                <Text style={styles.nametext}>{userDetails?.lastName}</Text>
              </View>
            </View>
          </>
        )}
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Display Name(Alias)</Text>
            <Text style={styles.nametext}>{userDetails?.displayName}</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Phone Number</Text>
            <Text style={styles.nametext}>{userDetails?.phone}</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Email Address</Text>
            <Text style={styles.nametext}>{userDetails?.email}</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Emergency Contact</Text>
            <Text style={styles.nametext}>{userDetails?.emergency.name ? userDetails?.emergency.name : "Nil"}</Text>
          </View>
        </View>
        <View style={styles.detailscontainer}>
          <View style={styles.namedetails}>
            <Text style={styles.namehead}>Emergency Number</Text>
            <Text style={styles.nametext}>{userDetails?.emergency.phone ? userDetails?.emergency.phone : "Nil"}</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
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
              <TouchableOpacity
                style={styles.modalLineContainer}
                onPress={hideProfilePicture}
              >
                <Text style={styles.modalText}>Hide Profile Picture</Text>
                <FontAwesome name="user-o" size={16} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalLineContainer}
                onPress={() => {
                  toggleModal()
                  navigation.navigate('Photo')
                }}
              >
                <Text style={styles.modalText}>Take photo</Text>
                <Feather name="camera" size={16} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  head: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161718',
    textAlign: 'center',
  },
  edit: {
    color: '#1B6ADF',
    fontSize: 16,
    textDecorationLine: 'underline',

  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    width: '100%',
    height: 100,
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
    marginLeft: 16,
    flex: 1,
    gap: 7,
    color: '#212121',
  },
  name: {
    fontSize: 20,
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
});
