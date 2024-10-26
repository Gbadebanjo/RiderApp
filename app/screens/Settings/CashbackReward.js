import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const CashbackReward = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="#0c0c0c" />
                <Text style={styles.head}>Cashback Reward </Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
                <Text style={styles.text}><Text style={styles.texthead}>Unlock Instant Rewards:</Text> When you ride with RYDEPRO, you’ll earn a percentage of your booking amount as cash back—no waiting required!
                    Whether it’s a quick city commute or an epic road trip, your rewards add up seamlessly</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Flexible Redemption:</Text> Use your rewards for future rides, surprise gifts, or pamper yourself with services from RYDEPRO and our partner network.
                    It’s like having a pocketful of perks every time you hop in a RYDEPRO car!</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Disclaimer:</Text> Terms and conditions apply. Stay tuned for updates on the upcoming Rhodium Dynamic Rewards program.</Text>
            </View>
        </SafeAreaView>
    )
}

export default CashbackReward

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0c0c0c',
        textAlign: 'center',
        flex: 1,
    },
    bodyContainer: {
        backgroundColor: '#f9f9f9',
        paddingTop: 10,
    },
    key: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#161718',
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        color: '#161718',
        marginTop: 20,
        fontWeight: '400',
    },
    texthead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#161718',
    }
})