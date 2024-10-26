import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Feather } from '@expo/vector-icons';
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../../api/client';
import deactivateApi from '../../api/auth';
import Toast from 'react-native-toast-message';


export default function DevicesList({ navigation }) {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Function to format date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();
    };



    const deactivateDevice = async (device) => {

        const token = await AsyncStorage.getItem('userToken');
        setAuthToken(token);
        try {
            const response = await deactivateApi.deactivateDevice({
                deviceInfo: {
                    deviceId: device.deviceId,
                    deviceName: device.deviceName,
                    deviceType: device.deviceType
                }
            });
            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data.message,
                });
                return;
            }
            setUserDetails(response.data.rider);  // Update the user details
            setModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Device logged out successfully',
            });
        }
        catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred. Please try again',
            });
        }
    };


    // Function to handle device click (show modal)
    const handleDeviceClick = (device) => {
        if (device.status === 'active') {
            setSelectedDevice(device);
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={20} color='#111' />
                </TouchableOpacity>
                <View style={styles.activeContainer}>
                    <Text style={styles.Title}>Active Devices</Text>
                    <Text style={styles.subTitle}>These are the devices your account is signed into</Text>
                    <View>
                        {userDetails?.devices.map((device, index) => (
                            device.status === 'active' && (
                                <TouchableOpacity key={index} style={styles.deviceItem} onPress={() => handleDeviceClick(device)}>
                                    <Entypo name="mobile" size={20} color={device.status === 'active' ? '#000' : '#767676'} />
                                    <View style={styles.deviceInfo}>
                                        <Text style={styles.deviceName}>{device.deviceName} ({device.deviceType})</Text>
                                        <Text style={styles.deviceType}>{formatDate(device.dateAdded)} - {device.logInFrom}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        ))}
                    </View>
                </View>
                <View style={styles.inactiveContainer}>
                    <Text style={styles.Title}>Inactive Devices</Text>
                    <Text style={styles.subTitle}>These are the devices that are not currently signed in</Text>
                    <View>
                        {userDetails?.devices.map((device, index) => (
                            device.status === 'inactive' && (
                                <View key={index} style={styles.deviceItem}>
                                    <Entypo name="mobile" size={20} color='#767676' />
                                    <View style={styles.deviceInfo}>
                                        <Text style={styles.deviceName}>{device.deviceName} ({device.deviceType})</Text>
                                        <Text style={styles.deviceType}>{formatDate(device.dateAdded)} - {device.logInFrom}</Text>
                                    </View>
                                </View>
                            )
                        ))}
                    </View>
                </View>


                {/* Modal for logging out */}
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} >
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Sign out of this device!</Text>
                            <Text style={styles.modalText2}>Are you sure you want to sign out of {selectedDevice?.deviceName}?</Text>
                            <View style={styles.modalButtons}>

                                <TouchableOpacity
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => deactivateDevice(selectedDevice)}
                                >
                                    <Text style={styles.textStyle2}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
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
    titleContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#111',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#3c3c3c',
    },
    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
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
        color: '#0e0e0e',
        fontSize: 12,
    },
    activeContainer: {
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3c3c3c',
    },
    inactiveContainer: {
        marginTop: 20,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5 )',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '500',
        color: '#0e0e0e',
    },
    modalText2: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 14,
        color: '#3c3c3c',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: '#fff',
        borderWidth: 1,
        textColor: "#D21B34",
        borderColor: "#D21B34",

    },
    buttonCancel: {
        backgroundColor: '#0c0c0c',
    },
    textStyle: {
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
    },
    textStyle2: {
        color: '#D21B34',
        fontWeight: '500',
        textAlign: 'center',
    },
});
