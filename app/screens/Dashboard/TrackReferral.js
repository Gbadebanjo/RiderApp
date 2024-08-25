import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const TrackReferral = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="black" />
                <Text style={styles.head}>Track Referral</Text>
            </TouchableOpacity>
            <Text style={styles.texthead}>Number of Referral that created a RYDEPRO Account using your code</Text>
            <View style={styles.subcontainer}>
                <Text style={styles.type}>Individual</Text>
                <Text style={styles.num}>0</Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={styles.type}>Company</Text>
                <Text style={styles.num}>0</Text>
            </View>
        </SafeAreaView>
    )
}

export default TrackReferral

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
    texthead: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#161718',
        marginTop: 30,
    },
    subcontainer: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    type: {
        fontSize: 18,
        color: '#464646',
        marginBottom: 10,
        fontWeight: '500',
    },
    num: {
        fontSize: 16,
        color: '#464646',
    },
})