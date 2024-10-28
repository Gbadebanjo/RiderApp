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
import { FontAwesome, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../context/AppContext';

const ProfileDetails = ({ navigation, route }) => {
  const { userDetails } = useContext(AppContext);
  const [showName, setShowName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isProfilePicHidden, setIsProfilePicHidden] = useState(false); // State to manage profile picture visibility
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial value for sliding animation

  // console.log(userDetails)
  
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
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <FontAwesome name="angle-left" size={24} color="#0c0c0c" />
        </TouchableOpacity>
        <View style={styles.userProfileHeader}>
          <Text style={styles.head}>Profile</Text>
          <View style={styles.image}>
            <Image source={isProfilePicHidden || !userDetails?.profileImg ? require('../../assets/ProfileTemplate.png') : { uri: userDetails.profileImg }} style={styles.imageStyle} resizeMode="cover" />
          </View>
          <TouchableOpacity style={styles.profilePicture} onPress={toggleModal} >
            <Text style={styles.profileText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editContainer} onPress={() => navigation.navigate('Edit')}>
            <Feather name="edit-2" size={18} color="#0c0c0c" />
            <Text style={styles.edit}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

          <Text style={styles.label}>Account Type</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.accountType}</Text></View>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.firstName}</Text></View>
          <Text style={styles.label}>Last Name</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.lastName}</Text></View>
          <Text style={styles.label}>Display Name</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.displayName}</Text></View>
          <Text style={styles.label}>Other Language Spoken</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.otherLangSpoken}</Text></View>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.dateOfBirth}</Text></View>
          {/* <Text style={styles.label}>Gender</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.firstName}</Text></View> */}
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.email}</Text></View>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.phone}</Text></View>
          <Text style={styles.label}>City</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.location ? JSON.parse(userDetails.location)?.city : 'N/A'}
          </Text></View>
          <Text style={styles.label}>State</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.location ? JSON.parse(userDetails.location)?.state : 'N/A'}</Text></View>
          <Text style={styles.label}>Country</Text>
          <View style={styles.value}><Text style={styles.valueText}>{userDetails?.location ? JSON.parse(userDetails.location)?.country : 'N/A'}</Text></View>
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

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  head: {
    fontSize: 18,
    fontWeight: '600',
    color: '#161718',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  userProfileHeader: {
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 60,
  },
  profilePicture: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#d8d8d8'
  },
  profileText: {
    color: '#0e0e0e',
    fontSize: 14,
    fontWeight: '600',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    gap: 7,
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    alignSelf: 'flex-end',
    borderColor: '#d8d8d8'
  },
  edit: {
    color: '#0e0e0e',
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    color: '#0e0e0e',
    fontSize: 14,
    fontWeight: '600',
    // marginVertical: 10,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,

  },
  value: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  valueText: {
    color: '#8a8a8a',
    fontSize: 16,
    fontWeight: '500',
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
