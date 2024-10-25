import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Feather } from '@expo/vector-icons'
import React from 'react'


export default function PassphraseCreateSelection({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.goBack()} >
                <Feather name="chevron-left" size={20} color='#111' />
            </TouchableOpacity>
            <Text style={styles.subtitle}>Passphrase Management</Text>
            <TouchableOpacity style={styles.toggle} onPress={() => navigation.navigate('PassphraseAutoGenerate')}>
                <Text style={styles.text} >Auto-Generate Passphrase</Text>
               <Feather name="chevron-right" size={20} color='#8a8a8a' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PassphraseManually')} style={styles.toggle}>
                <Text style={styles.text} >Manually Create Passphrase</Text>
                <Feather name="chevron-right" size={20} color='#8a8a8a' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
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
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0c0c0c',
        paddingHorizontal: 2,
        marginBottom: 20,
    },
    text: {
        fontSize: 15,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        
    },
   

});