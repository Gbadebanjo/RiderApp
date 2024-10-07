import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, Modal, Easing, TouchableWithoutFeedback, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Entypo, FontAwesome6, FontAwesome5, MaterialCommunityIcons, Octicons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { dashboardClient, setAuthToken } from '../../api/client';

export default function SettingHome({ navigation }) {
    // const [showReferral, setShowReferral] = useState(false);
    const [showLogOut, setShowLogOut] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current;


    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setAuthToken(null);
            navigation.navigate('FirstScreen');
            toggleModal();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const toggleModal = () => {
        setShowLogOut(!showLogOut);
        if (!showLogOut) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 10,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    };


    return (
        <LinearGradient
            colors={['#212121', '#212121', '#ffffff', '#ffffff']} // Black to White
            locations={[0, 0.55, 0.55, 1]} // Define the color stops
            start={{ x: 0, y: 0 }} // Gradient from top to bottom
            end={{ x: 0, y: 1 }}
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor='#212121' translucent={false} />
                <View>
                    <View style={styles.head}>
                        <TouchableOpacity style={styles.notification}>
                            <AntDesign name="search1" size={17} color="#fff" style={styles.notification} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.image}>
                        <Image source={require('../../assets/ProfileTemplate.png')} style={styles.img} />
                        <Ionicons name="camera-outline" size={26} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: 20 }}>Raymond Badmus</Text>
                    <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 2 }}>Individual</Text>
                    <Text style={{ color: '#464646', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>User ID: 12345686783</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
                    <Text style={styles.textHead}>Accounts</Text>
                    <TouchableOpacity style={styles.eachItem}
                        onPress={() => navigation.navigate('Account')}>
                        <Text style={styles.eachItemText}>Manage Profile</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachItem}
                        onPress={() => navigation.navigate('Security')}>
                        <Text style={styles.eachItemText}>Manage Security Options</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachItem}
                        onPress={() => navigation.navigate('HelpAndSupport')}>
                        <Text style={styles.eachItemText}>Help and Support</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <Text style={styles.textHead}>Promotions and Rewards</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RewardProgram')}
                        style={styles.eachItem}
                    >
                        <Text style={styles.eachItemText}>Rewards Program</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('InviteReferral')}
                        style={styles.eachItem}
                    >
                        <Text style={styles.eachItemText}>Invite Referral</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={styles.eachItem}
                    >
                        <Text style={{ color: '#c92014', fontSize: 16, padding: 10 }}>Logout</Text>
                        <Ionicons name="chevron-forward" size={20} color="#c92014" style={styles.forwardIcon} />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogOut}
                onRequestClose={() => {
                    setShowReferral(false);
                }}
            >
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.logOut}>Do you want to logout?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={toggleModal} style={[styles.eachButton, { backgroundColor: '#909090' }]}>
                                    <Text style={{ color: '#fff' }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={logOut} style={[styles.eachButton, { backgroundColor: '#000' }]}>
                                    <Text style={{ color: '#fff' }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#fff',
        flexGrow: 1,

    },
    notification: {
        backgroundColor: '#464646',
        padding: 5,
        borderRadius: 20,
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 75,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 5,
    },
    textHead: {
        color: '#000',
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 20,
        marginTop: 20,
    },
    eachItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    eachItemText: {
        color: '#212121',
        fontSize: 16,
        padding: 10,
    },
    forwardIcon: {
        marginRight: 10,
    },
    rewards: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7fa',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 25,
        height: 180,
    },
    logOut: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        paddingTop: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    eachButton: {
        padding: 13,
        borderRadius: 10,
        width: 80,
        alignItems: 'center',
        color: '#fff',
    },
});