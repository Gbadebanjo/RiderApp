import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const RewardProgram = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="black" />
                <Text style={styles.head}>Reward Program</Text>
            </TouchableOpacity>
            <View style={styles.subcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CashbackReward')}
                    style={styles.rewards}
                >
                    <MaterialCommunityIcons name="cash-refund" size={24} color="#292D32" />
                    <Text style={styles.rewardtext}>Cashback Rewards</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MilesPoint')}
                    style={styles.rewards}
                >
                    <Entypo name="shareable" size={24} color="#292D32" />
                    <Text style={styles.rewardtext}>Miles Points</Text>
                    <Entypo name="chevron-thin-right" size={14} color="#98A0B3" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RewardProgram

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
        marginTop: 40,
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        padding: 20,
    },
    rewards: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    rewardtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#292D32',
        flex: 1,
        marginLeft: 20,
    },
})