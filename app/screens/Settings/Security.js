import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function Security({ navigation }) {
    const [isFacialIDEnabled, setIsFacialIDEnabled] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.title}>Security</Text>
            <Text style={styles.subTitle}>Enable both layers of Security</Text>
            <Text style={styles.option}>First Layer Security Option</Text>
            <View style={styles.eachSecurity}>
                <Text style={styles.text}>Face ID</Text>
                <Switch
                    value={isFacialIDEnabled}
                    // onValueChange={toggleFacialID}
                    trackColor={{ false: '#ffffff', true: '#ffffff' }}
                    thumbColor={isFacialIDEnabled ? '#767577' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                />
            </View>
            <Text style={styles.or}> Or</Text>
            <View style={styles.eachSecurity}>
                <Text style={styles.text}>Finger ID</Text>
                <Switch
                    value={isFacialIDEnabled}
                    // onValueChange={toggleFacialID}
                    trackColor={{ false: '#ffffff', true: '#ffffff' }}
                    thumbColor={isFacialIDEnabled ? '#767577' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                />
            </View>
            <Text style={styles.option}>Second Layer Security Option</Text>
            <TouchableOpacity style={styles.eachSecurity}>
                <Text style={styles.text}>Pin</Text>
                <Feather name="chevron-right" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.or}> Or</Text>
            <TouchableOpacity style={styles.eachSecurity}>
                <Text style={styles.text}>Passphrase</Text>
                <Feather name="chevron-right" size={20} color='#111' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.password}>
            <Text style={styles.text}>Change Password</Text>
            <Feather name="chevron-right" size={20} color='#111' />
            </TouchableOpacity>


            <TouchableOpacity style={styles.devices} onPress={() => navigation.navigate('DevicesList')}>
                <Entypo name="mobile" size={20} color='#767676' />
                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                    <Text style={{ color: '#0e0e0e', fontSize: 14 }}>Devices</Text>
                    <Text style={{ color: '#3c3c3c', fontSize: 12 }}>List of devices where you're logged in</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    icon: {
        padding: 20,
        color: '#fff',
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingVertical: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0e0e0e',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3c3c3c',
        paddingVertical: 10,
    },
    option: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8a8a8a',
        paddingVertical: 20,
    },
    eachSecurity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    password: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 30,
        borderColor: '#dadada',
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    or: {
        color: '#8a8a8a',
        fontSize: 14,
    },
    devices: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
});