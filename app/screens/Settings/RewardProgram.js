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
                <FontAwesome name="angle-left" size={24} color="#fff" />
                <Text style={styles.head}>Reward Program</Text>
            </TouchableOpacity>
            <View style={styles.subcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CashbackReward')}
                    style={styles.rewards}
                >
                    <Text style={styles.rewardtext}>Cashback Rewards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MilesPoint')}
                    style={styles.rewards}
                >
                    <Text style={styles.rewardtext}>Miles Points</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RewardProgram

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
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
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
    subcontainer: {
        marginTop: 20,
    },
    rewards: {
        backgroundColor: '#f5f7fa',
        marginVertical: 10,
        paddingVertical: 20,
        borderRadius: 10,

    },
    rewardtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#292D32',
        marginLeft: 20,
    },
})