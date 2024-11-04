import { StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar,  } from 'react-native-web'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const googleLogo = require('./../../../assets/GoogleIcon.png');

GoogleSignin.configure({
  webClientId: "447373894859-p3qt639opm2c12b9o07la0r30amha66n.apps.googleusercontent.com",
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true, 
  forceCodeForRefreshToken: true, 
  iosClientId: "447373894859-38d2ev07f0obb5a3f6usf0ja8l6g4v81.apps.googleusercontent.com",
});

export default function LoginOptions({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('userInfo:', userInfo);
        // setData(userInfo);
      } catch (error) {
        console.log('error', error);
        // setError(error.message || 'An unexpected error occurred');
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // Android only, play services not available or outdated
              break;
            default:
            // some other error happened
          }
        } else {
          console.log('an error thats not related to google sign in occurred');
          setError('Npot going');
        }
      }
    };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <View>
            <TouchableOpacity onPress={toggleModal} style={styles.dotsButton}>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>      

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
                animationType="fade"
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={()=> navigation.navigate('RecoveryEmail')}>
                      <Text style={styles.modalItem}>Account Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.modalItem}>Faq</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            <Text style={styles.title}>Sign In Options</Text>

            <View style={styles.maincontent}>
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePincode')}>
                    <MaterialIcons name="lock" size={25} color="#0E0E0E" />
                    <Text>Pin</Text>
                </TouchableOpacity>      
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePassphrase')}>
                    <Ionicons name="key-outline" size={25} color='#0E0E0E' />
                    <Text>Passphrase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachclickable}>
                    <AntDesign name="apple1" size={25} color="#0E0E0E" />
                    <Text>Apple ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachclickable} onPress={signIn}>
                    <Image source={googleLogo} style={styles.googleLogo}/>
                    <Text style={styles.texts}>Google Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePassword')}>
                    <MaterialCommunityIcons name="email-outline" size={25} color='#0E0E0E' />
                    <Text>Email Account</Text>
                </TouchableOpacity>
            </View>
          </View>
          
        <View style={styles.three}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signupText}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.privacyText}>Privacy</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        marginTop: '5%',
    },
    title: {
        marginTop: '10%',
        fontSize: 20,
        fontWeight: '700',
        color: '#0E0E0E',
        textAlign: 'center',
    },
    maincontent: {
        color: '#212121',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: '4%',
    },
    eachclickable:{
        flexDirection: 'row',
        paddingTop: '8%',
        paddingBottom: '5%',
        // borderBottomWidth: 1,
        // borderBottomColor: '#dddddd',
        alignItems: 'center',
        gap: 10,
        width: '90%',
        marginLeft: '5%'
    },
    googleLogo: {
        width: 25,
        height: 25,
    },
    texts: {
        fontSize: 16,
        color: '#111111',
    },
    cancel: {
       textAlign: 'start',
       marginLeft: '5%',
       marginBottom: '5%',
    },
    dotsButton: {
        position: 'absolute',
        right: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    marginTop: 60,
    marginRight: 20,
  },
  modalItem: {
    color: 'white',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
    },
  three: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '40%',
  },
  signupText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    borderRightWidth: 2,
    borderRightColor: '#D0D0D0',
    paddingHorizontal: 10,
  },
  privacyText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0E0E0E',
    paddingHorizontal: 10,
  },
})