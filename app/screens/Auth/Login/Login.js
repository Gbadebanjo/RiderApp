// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../../components/StyledButton';
import Centerlogo from '../../../components/centerlogo';
import SocialLogo from '../../../components/SocialLogo';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
const googleLogo = require('./../../../assets/GoogleIcon.png');
const appleLogo = require('./../../../assets/AppleLogo.png');

export default function Login({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Centerlogo/>
      <Text style={styles.title}>Login to your Account</Text>

          <View style={styles.socialsLogo}>
            <SocialLogo text="Face ID" onPress={()=> navigation.navigate('FacialID')} logo={<AntDesign name="scan1" size={30} color='#7DB7FF'/>} />
            <SocialLogo text="Biometric" onPress={()=> navigation.navigate('Biometric')} logo={<Ionicons name="finger-print" size={30} color='#0F488F' />}/>
            <SocialLogo text="Email" onPress={()=> navigation.navigate('UsePassword')} logo={<MaterialCommunityIcons name="email" size={30} color='#000000' />}/>
            <SocialLogo text="Apple" onPress={()=> alert('Login with Apple')} logo={appleLogo}/>
            <SocialLogo text="Google" onPress={()=> alert('Login with Google')} logo={googleLogo}/>
          </View>

          <View style={styles.socialsLogo2}>
            <SocialLogo text="Pincode" onPress={()=> navigation.navigate('Pin')} logo={<Ionicons name="key-outline" size={30} color='#0B6703' />}/>
            <SocialLogo text="Passphrase" onPress={()=> navigation.navigate('Passphrase')} logo={<MaterialCommunityIcons name="line-scan" size={30} color='black' />}/>
          </View>

          <TouchableOpacity onPress={() => alert('Account Recovery')}>
            <Text style={styles.loginText}>Account Recovery</Text>
          </TouchableOpacity>

          <StyledButton
            title="Create an Account"
            onPress={()=> navigation.navigate('CreateAccount')}
            width="100%"
            height={53}
            paddingVertical={10}
            marginTop={40}
            backgroundColor="#212121"
            borderWidth={2}
            TextColor="#fff"
            iconName="angle-right" 
            />

          <TouchableOpacity onPress={() => alert('Continue as Guest')}>
            <Text style={styles.loginText}>Continue as Guest</Text>
          </TouchableOpacity>

      <View style={styles.flexSpacer} />

      <Text style={styles.proceedText}>
        By proceeding, you agree to RYDEPRO’s Terms, Privacy Notice and can unsubscribe by emailing 
        <Text style={styles.boldText}> "Unsubscribe" </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal:30,
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 22,
    fontWeight: '600',
    color: '#212121'
  },
  socialsLogo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  socialsLogo2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#212121',
    textDecorationLine: 'underline',
  },
  proceedText:{
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#212121',
    width: '100%',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  flexSpacer: {
    flex: 1,
  },
});
