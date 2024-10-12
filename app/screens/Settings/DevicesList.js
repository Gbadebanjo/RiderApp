import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';

export default function DevicesList ({navigation}) {
    const { userDetails } = useContext(AppContext);
    console.log('User Details:', userDetails.devices);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#212121" />
            <View style={styles.titleContainer}> 
                <Ionicons name="arrow-back" size={24} color='#fff'
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Additional Security</Text>
            </View>    
            <Text style={styles.subTitle}>These are the devices your account is signed into</Text>    
            {/* Device List */}
            <ScrollView>
                { userDetails?.devices?.map((device, index) => (
            <View key={index} style={styles.deviceItem}>
                <Entypo name="mobile" size={20} color='#767676' />
                <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{device.deviceName}</Text>
                    <Text style={styles.deviceType}>{device.deviceType}  {device.deviceId}</Text>
                </View> 
            </View>
            ))}
            </ScrollView>
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
        fontSize: 14,
        fontWeight: '400',
        color: '#767676',
    },
    devices: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 20,
    },
    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    deviceInfo: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    deviceName: {
        color: '#f7f7f7',
        fontSize: 16,
        fontWeight: '500',
    },
    deviceType: {
        color: '#b9b9b9',
        fontSize: 14,
    },
});