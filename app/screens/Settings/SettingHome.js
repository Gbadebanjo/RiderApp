import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, Modal, Easing, TouchableWithoutFeedback, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Entypo, FontAwesome6, FontAwesome5, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';
import SecurityIntroModal from '../../components/SecurityIntro';

export default function SettingHome({ navigation }) {
    const { userDetails, setUserDetails } = useContext(AppContext);
    const [showLogOut, setShowLogOut] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect( () => {
        const timer = setTimeout(() => {
            if (userDetails.authsEnabled.length <= 1) {
            setModalVisible(true)
        } 
    }, 3000);

        return () => clearTimeout(timer); 
    }, [userDetails]);

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setUserDetails(null);
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
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor='#212121' translucent={false} />
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.image}>
                    <Image source={userDetails?.profileImg ? { uri: userDetails?.profileImg } : require('../../assets/ProfileTemplate.png')} style={styles.img} />
                </TouchableOpacity>
                {/* <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: 20 }}>{userDetails?.firstName} {userDetails?.lastName}</Text> */}
                <Text style={{ color: '#0E0E0E', fontSize: 20, fontWeight: '700', textAlign: 'center', margin: 5 }}>{userDetails?.displayName}</Text>
                {/* <Text style={{ color: '#464646', fontSize: 14, textAlign: 'center', marginBottom: 20 }}>User ID: {userDetails?.accountId}</Text> */}
                <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center' }}>
                    User ID: <Text style={{ color: '#0E0E0E', fontWeight: '700' }}>{userDetails?.accountId}</Text>
                </Text>
                <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center', margin: 7 }}>Ratings</Text>
                <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('Account')}>
                    <Text style={styles.viewBox}>View Profile</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
                <Text style={styles.textHead}>User</Text>
                <TouchableOpacity style={styles.eachItem}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="timer-outline" size={22} color="#8a8a8a" />
                    </View>
                    <Text style={styles.disabledEachItemText}>Ride History</Text>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <Text style={styles.textHead}>Promotions</Text>
                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('RewardProgram')}>
                    <View style={styles.iconWrapper}>
                        <SimpleLineIcons name="badge" size={22} color="#8a8a8a" />
                    </View>
                    <Text style={styles.disabledEachItemText} >Rewards and Miles Points</Text>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('InviteReferral')}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="adduser" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Referral Program</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" style={styles.forwardIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('RewardProgram')}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="creditcard" size={22} color="#8a8a8a" />
                    </View>
                    <Text style={styles.disabledEachItemText} >Payment Methods</Text>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="gift" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Promotions and offers</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <Text style={styles.textHead}>Settings</Text>
                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Security')}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="setting" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Security Options</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem}
                    onPress={() => navigation.navigate('HelpAndSupport')}>
                    <View style={styles.iconWrapper}>
                        <AntDesign name="customerservice" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Support and Help</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem}
                    onPress={() => navigation.navigate('HelpAndSupport')}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="briefcase-outline" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Legal</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachItem}
                    onPress={() => navigation.navigate('HelpAndSupport')}>
                    <View style={styles.iconWrapper}>
                        <MaterialIcons name="language" size={22} color="#000" />
                    </View>
                    <Text style={styles.eachItemText}>Language</Text>
                    <Ionicons name="chevron-forward" size={20} color="#8a8a8a" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleModal}
                    style={styles.eachItem}
                >
                    <View style={styles.iconWrapper}>
                        <Ionicons name="log-in-outline" size={22} color="#c92014" />
                    </View>
                    <Text style={{ color: '#c92014', fontSize: 16, padding: 10 }}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

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

                       {/* Render the SecurityIntroModal */}
            <SecurityIntroModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                navigation={navigation}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        // width: '100%'
    },
    profileContainer: {
        marginTop: 30,
        marginBottom: 15,
        justifyContent: 'center',
        alignContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    image: {
        alignSelf: 'center',
        borderRadius: 60,
    },
    viewBox: {
        color: '#212121',
        fontSize: 16,
        fontWeight: '700',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d0d0d0',
    },
    img: {
        width: 110,
        height: 110,
        borderRadius: 60,
        objectFit: 'cover',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 5,
    },
    iconWrapper: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 20,
    },
    textHead: {
        color: '#8a8a8a',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20,
        marginTop: 20,
    },
    eachItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    eachItemText: {
        color: '#212121',
        fontSize: 17,
        padding: 10,
        flex: 1,
        fontWeight: '500'
    },
    disabledEachItemText: {
        color: '#8a8a8a',
        fontSize: 17,
        padding: 10,
        flex: 1,
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