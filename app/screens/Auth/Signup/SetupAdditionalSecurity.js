import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Switch} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../components/BackButton';
import StyledButton from '../../../components/StyledButton';
import Toast from 'react-native-toast-message';
import SecurityModal from '../../../components/SecurityModal';
import CreatePinModal from '../../../components/CreatePinModal';
import ConfirmPinModal from '../../../components/ConfirmPinModal';
import CreatePassphraseModal from '../../../components/CreatePassphraseModal';

export default function SetupAdditionalSecurity ({navigation}) {
    const [isCreatePin, setIsCreatePin] = useState(false);
    const [isCreatePassphrase, setIsCreatePassphrase] = useState(false);
    const [isAnyAuthEnabled, setIsAnyAuthEnabled] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [isPinModalVisible, setIsPinModalVisible] = useState(false);
    const [isConfirmPinModalVisible, setIsConfrimPinModalVisible] = useState(false);
    const [isPassphraseModalVisible, setIsPassphraseModalVisible] = useState(false);

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDetailsString = await AsyncStorage.getItem('userDetails');
          const userDetails = JSON.parse(userDetailsString);
  
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      fetchUserDetails();
    }, []);

    const togglePin = (value) => {
        setIsCreatePin(value);
        if (value) {
            setIsPinModalVisible(true);
        } else {
            setIsPinModalVisible(false);
        }
        setIsAnyAuthEnabled(value || isCreatePassphrase);
    };

    const handleCloseCreatePin = () => {
        setIsPinModalVisible(false);
        setIsCreatePin(false);
        setIsAnyAuthEnabled(false);
    };

    const handlePinSubmit = async (pinCode) => {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);
      userDetails.pin = pinCode;

      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));

        setIsPinModalVisible(false)
        setIsCreatePin(true);
        setIsConfrimPinModalVisible(true);
    }

    const handleConfirmPin = async (confirmCode) => {
      const userDetailsString = await AsyncStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);

      console.log(userDetails.pinCode, confirmCode);
    
      if (userDetails.pin === confirmCode) {
        userDetails.confirmPin = confirmCode;
        await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    
        setIsConfrimPinModalVisible(false);
        setIsAnyAuthEnabled(true);
    
        return Toast.show({
          type: 'success',
          text1: 'Pin code created successfully',
        });
      } else {
        setIsConfrimPinModalVisible(false);
        setIsCreatePin(false);
        setIsAnyAuthEnabled(false);
        return Toast.show({
          type: 'error',
          text1: 'Pin codes do not match',
        });
      }
    }

    const togglePasspharse = (value) => {
        setIsCreatePassphrase(value);
        if (value) {
            setIsPassphraseModalVisible(true);
        } else {
            setIsPassphraseModalVisible(false);
        }
        setIsAnyAuthEnabled(value || isCreatePin);
    };

    const closePassphraseModal = () => {
      setIsCreatePassphrase(false);
      setIsPassphraseModalVisible(false);
      setIsAnyAuthEnabled(isCreatePin);
      setIsAnyAuthEnabled(false);
    };

  const handlePassphraseGenerated = (generatedPassphrase) => {
      setPassphrase(generatedPassphrase);
      setIsCreatePassphrase(true);
      setIsAnyAuthEnabled(true);
      setIsPassphraseModalVisible(false);
  };
  

    //  const handleSubmit = () => {
    //     setIsModalVisible(true);
    //   }
  
      const handleProceed = () => {
        navigation.navigate('ThankYou');
      };
  
    const isAnyToggleEnabled = isCreatePin || isCreatePassphrase;

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="default" backgroundColor="#111111" />
    <View style={styles.titleContainer}> 
        <TouchableOpacity
            style={styles.Icon}
            onPress={() => navigation.goBack()}>
            <BackButton style={styles.Icon} iconColor="#ffffff"/>
        </TouchableOpacity>
        <Text style={styles.title}>Additional Security</Text>
    </View>    
    <View  style={styles.securityOptions}>
        <Text style={styles.subtitle}>Add Additional Security</Text>

        <View style={styles.eachSecurity}>
            <Text style={styles.text}>Pin</Text>
            <Switch
                value={isCreatePin}
                onValueChange={togglePin}
                trackColor={{ false: '#ffffff', true: '#ffffff' }}
                thumbColor={isCreatePin ? '#767577' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
            />
        </View>

        <View style={styles.eachSecurity}>
            <Text style={styles.text}>Passphrase</Text>
            <Switch
                value={isCreatePassphrase}
                onValueChange={togglePasspharse}
                trackColor={{ false: '#ffffff', true: '#ffffff' }}
                thumbColor={isCreatePassphrase ? '#767577' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
            />
        </View>
    </View>

    {isAnyToggleEnabled && (
      <View style={styles.buttonContainer}>
        <StyledButton
            title="Cancel"
            // onPress={handleSubmit}
            width="30%"
            paddingVertical={10}
            marginTop={0}
            backgroundColor="#111"
            borderWidth={0}
            TextColor="#FFFFFF"
            borderRadius={10}
            fontSize={15}
        />

        <StyledButton
            title="Proceed"
            onPress={handleProceed}
            width="30%"
            paddingVertical={10}
            marginTop={0}
            backgroundColor="#FFFFFF"
            borderWidth={2}
            TextColor="#000000"
            borderRadius={15} 
            fontSize={15}
        />
      </View>   
    )}

    <CreatePinModal 
        visible={isPinModalVisible} 
        onClose={handleCloseCreatePin}
        onSubmit={handlePinSubmit}
    />

    <ConfirmPinModal 
        visible={isConfirmPinModalVisible} 
        onClose={handleCloseCreatePin}
        onSubmit={handleConfirmPin}
    />

    <CreatePassphraseModal
        isVisible={isPassphraseModalVisible}
        onClose={closePassphraseModal}
        navigation={navigation}
        onPassphraseGenerated={handlePassphraseGenerated}
    />
     
</SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#111111',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    securityOptions: {
        flex: 1,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    eachSecurity: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    fingerprint: {
       borderWidth: 1.5,
       borderRadius: 8,
       padding: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    modal: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    modalContent: {
      width: '90%',
      // flexDirection: 'column',
      marginTop: 70,
      justifyContent: 'space-between',
      gap: 70
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center'
    },
    modalText: {
      fontSize: 16,
      textAlign: 'center',
    },
    modalCenterText: {
      fontSize: 12,
      textAlign: 'center',
    },
    topSection: {
      // flex: 1,
    },
    logo: {
      width: '30%',
      aspectRatio: 1,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 50,
      marginBottom: 20,
    },
    bottomSection: {
      top: '25%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: 0, 
    },
    cancelbutton: {
      padding: 10,
      width: '25%',
      backgroundColor: '#fff',
      borderRadius: 8,
      justifyContent: 'center',
    },
    confirmbutton: {
      padding: 10,
      backgroundColor: '#000',
      borderRadius: 8,
      width: '25%',
      justifyContent: 'center'
    },
    buttonText1: {
      color: '#000',
      fontSize: 14,
      textAlign: 'start',
    },
    buttonText2: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
});