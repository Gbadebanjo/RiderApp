import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';


export default function PinSettings({ navigation }) {
    const { userDetails } = useContext(AppContext);

    const pinExists = userDetails.authsEnabled.includes('pin');
    console.log('Pin exists:', pinExists);

    const handlePinNavigation = () => {
        if (pinExists) {
            navigation.navigate('PinPasswordScreen', { action: 'change' });
        } else {
            navigation.navigate('CreatePinScreen', { action: 'create' });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <View style={styles.titleContainer} >
                <Ionicons name="arrow-back" size={24} color='#fff'
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Pin</Text>
            </View>
            <Text style={styles.subtitle}>Pin Management</Text>

            <TouchableOpacity onPress={handlePinNavigation}>
                <Text style={styles.text} >{pinExists ? 'Change Pin' : 'Create Pin'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#767676',
        paddingHorizontal: 2,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        marginTop: 20,
    },

});