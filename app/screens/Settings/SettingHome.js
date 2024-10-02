import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Entypo, FontAwesome6, FontAwesome5, MaterialCommunityIcons, Octicons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { dashboardClient, setAuthToken } from '../../api/client';

export default function SettingHome({ navigation }) {
    const [showReferral, setShowReferral] = useState(false);

    return (
        <LinearGradient
            colors={['#212121', '#212121', '#ffffff', '#ffffff']} // Black to White
            locations={[0, 0.55, 0.55, 1]} // Define the color stops
            start={{ x: 0, y: 0 }} // Gradient from top to bottom
            end={{ x: 0, y: 1 }}
            style={styles.linearGradient}
        >
            <SafeAreaView>
                <StatusBar barStyle="light-content" backgroundColor='#212121' translucent={false} />
                <View>
                    <View style={styles.head}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ color: '#c92014' }}>Logout</Text>
                        </TouchableOpacity>
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
                        onPress={() => navigation.navigate('MenuLanding')}>
                        <Text style={styles.eachItemText}>Manage Security Options</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachItem}>
                        <Text style={styles.eachItemText}>Help and Support</Text>
                        <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    <Text style={styles.textHead}>Promotions and Rewards</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RewardProgram')}
                        style={styles.eachItem}
                    >
                        <Text style={styles.eachItemText}>Rewards Program</Text>
                        <Ionicons name="chevron-down" size={20} color="#000" style={styles.forwardIcon} />
                    </TouchableOpacity>
                    {showReferral &&
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TrackReferral')}
                                style={styles.eachItem}
                            >
                                <Text style={{ color: '#000', fontSize: 16, padding: 10 }}>Track Referral</Text>
                                <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('InviteReferral')}
                                style={styles.eachItem}
                            >
                                <Text style={{ color: '#000', fontSize: 16, padding: 10 }}>Invite Referral</Text>
                                <Ionicons name="chevron-forward" size={20} color="#000" style={styles.forwardIcon} />
                            </TouchableOpacity>
                        </>
                    }
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#fff',
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
        justifyContent: 'space-between',
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
});