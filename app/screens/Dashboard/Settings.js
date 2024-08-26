import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import BackButton from '../../components/BackButton';
import { Entypo, MaterialCommunityIcons, Ionicons, Octicons } from '@expo/vector-icons';

export default function Settings({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}>
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Settings</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('Security')}
                >
                    <MaterialCommunityIcons name="shield-check-outline" size={24} color='#212121' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Security</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('')}
                >
                    <MaterialCommunityIcons name="lock-off-outline" size={24} color='#212121' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Privacy & Data</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('')}
                >
                    <Ionicons name="notifications-outline" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Notification</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('')}
                >
                    <Octicons name="note" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Terms</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('')}
                >
                    <MaterialCommunityIcons name="lock-off-outline" size={24} color='#D3D3D3' />
                    <View style={styles.iconText}>
                        <Text style={[styles.text, {color :'#D3D3D3'}]}>Help & Support</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachSetting}
                    onPress={() => navigation.navigate('')}
                >
                    <MaterialCommunityIcons name="lock-off-outline" size={24} color='#D3D3D3' />
                    <View style={styles.iconText}>
                        <Text style={[styles.text, {color :'#D3D3D3'}]}>Delete Account</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    eachSetting: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    iconText: {
        flexDirection: 'row',
        width: '89%',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#98A0B3',
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#464646',
    },
});