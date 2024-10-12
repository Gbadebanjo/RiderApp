import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Ionicons } from '@expo/vector-icons';

export default function Security({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#212121" />
            <View style={styles.titleContainer}> 
                <Ionicons name="arrow-back" size={24} color='#fff'
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Additional Security</Text>
            </View>    
            <Text style={styles.subTitle}>Add Two Additional Security</Text>    
            <View style={styles.securityContainer}>
                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('FacialIdToggle')}
                    >
                    <View style={styles.eachFeature}>
                        <Text style={styles.text}>Facial Identification</Text>
                        <Entypo name="chevron-small-right" size={20} color='#fff' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('BiometricToggle')}
                    >
                    <View style={styles.eachFeature}>
                        <Text style={styles.text}>Biometrics</Text>
                        <Entypo name="chevron-small-right" size={20} color='#fff' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('PinSettings')}
                    >
                    <View style={styles.eachFeature}>
                        <Text style={styles.text}>Pin</Text>
                        <Entypo name="chevron-small-right" size={23} color='#fff' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('PassphraseScreen')}
                    >
                    <View style={styles.eachFeature}>
                        <Text style={styles.text}>Passphrase</Text>
                        <Entypo name="chevron-small-right" size={20} color='#fff' />
                    </View>
                </TouchableOpacity>
            </View>  
            <TouchableOpacity style={styles.devices} onPress={() => navigation.navigate('DevicesList')}>
            <Entypo name="mobile" size={20} color='#767676' />
            <View style={{flexDirection: 'column', marginLeft: 20}}>
                <Text style={{color: '#f7f7f7', fontSize: 14}}>Devices</Text>
                <Text style={{color: '#f9f9f9', fontSize: 14}}>List of devices where you're logged in</Text>    
            </View>
            </TouchableOpacity>      
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        paddingHorizontal: 20,
    },
    icon: {
        padding: 10,
        color: '#fff',
        backgroundColor: '#fff',
    },
    titleContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
        marginLeft: 20,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#767676',
        paddingHorizontal: 10,
    },
    securityContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    eachSecurity: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    eachFeature: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
    },
    devices: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#767676',
        paddingVertical: 20,
    },
});