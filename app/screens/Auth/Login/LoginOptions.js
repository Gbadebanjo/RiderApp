import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar,  } from 'react-native-web'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const googleLogo = require('./../../../assets/GoogleIcon.png');

export default function LoginOptions({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View>
            <Text style={styles.title}>Choose Options</Text>
            <Text style={styles.subtitle}>
                to continue with <Text  style={styles.rydepro}>RYDEPRO</Text>
                </Text>
            <View style={styles.maincontent}>
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePincode')}>
                    <MaterialIcons name="lock" size={30} color="black" />
                    <Text>Pin</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePassphrase')}>
                    <Ionicons name="key-outline" size={30} color='#0B6703' />
                    <Text>Passphrase</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.eachclickable} onPress={()=>navigation.navigate('UsePassword')}>
                    <MaterialCommunityIcons name="email-outline" size={30} color='#000' />
                    <Text>Email Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachclickable}>
                    <AntDesign name="apple1" size={30} color="black" />
                    <Text>Apple ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachclickable}>
                    <Image source={googleLogo} style={styles.googleLogo}/>
                    <Text style={styles.texts}>Google Account</Text>
                </TouchableOpacity>
            </View>
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
    },
    title: {
        marginTop: '10%',
        fontSize: 32,
        fontWeight: '500',
        color: '#212121',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: '2%',
        fontSize: 20,
        fontWeight: '500',
        color: '#212121',
        textAlign: 'center',
    },
    maincontent: {
        color: '#212121',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    rydepro: {
        color: '#558FE5',
      },
    eachclickable:{
        flexDirection: 'row',
        paddingTop: '15%',
        paddingBottom: '7%',
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0',
        alignItems: 'center',
        gap: 10,
    },
    googleLogo: {
        width: 30,
        height: 30,
    },
    texts: {
        fontSize: 16,
        color: '#111111',
    },
    cancel: {
        textAlign: 'start',
        marginLeft: '5%',
        marginBottom: '5%',
    }
})