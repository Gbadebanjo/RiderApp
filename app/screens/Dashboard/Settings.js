import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { FontAwesome, Feather, Entypo } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="black" />
                <Text style={styles.head}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.subcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Security</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Privacy & Data</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Notifications</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Terms</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Help & Support</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Security')}
                    style={styles.detailsrow}>
                    <Feather name="lock" size={24} color="#98A0B3" />
                    <Text style={[styles.detailname, { color: '#464646' }]}>Delete Account</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#161718',
        textAlign: 'center',
        flex: 1,
    },
    subcontainer: {
        marginTop: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#E0E0E0',
    },
    detailsrow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    detailname: {
        fontSize: 18,
        color: '#464646',
        marginLeft: 20,
        flex: 1,
    },

})