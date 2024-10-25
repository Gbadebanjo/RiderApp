import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';

export default function DevicesList ({navigation}) {
    const { userDetails } = useContext(AppContext);
    console.log('User Details:', userDetails.devices);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <Feather name="chevron-left" size={20} color='#111' onPress={() => navigation.goBack()}/>
            </View>    
            <Text style={styles.Title}>Active Devices</Text>    
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
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20,
    },
    icon: {
        padding: 10,
        color: '#0e0e0e',
        backgroundColor: '#0e0e0e',
    },
    Title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#111',
        marginBottom: 10,
    },
    titleContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#3c3c3c',
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
        color: '#0e0e0e',
        fontSize: 16,
        fontWeight: '500',
    },
    deviceType: {
        color: '#b9b9b9',
        fontSize: 14,
    },
});