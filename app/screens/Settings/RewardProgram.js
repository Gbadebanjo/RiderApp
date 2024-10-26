import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const RewardProgram = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="#0e0e0e" />
                <Text style={styles.head}>Reward Program</Text>
            </TouchableOpacity>
            <View style={styles.subcontainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CashbackReward')}
                    style={styles.rewards}
                >
                    <View style={styles.iconWrapper}>
                        <AntDesign name="gift" size={22} color="#000" />
                    </View>
                    <Text style={styles.rewardtext}>Cashback Rewards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MilesPoint')}
                    style={styles.rewards}
                >
                    <View style={styles.iconWrapper}>
                        <AntDesign name="gift" size={22} color="#000" />
                    </View>
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
        backgroundColor: '#fcfcfc',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0e0e0e',
        textAlign: 'center',
        flex: 1,
    },
    subcontainer: {
        marginTop: 20,
    },
    rewards: {
        backgroundColor: '#f5f7fa',
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    rewardtext: {
        fontSize: 16,
        fontWeight: '400',
        color: '#0e0e0e',
        marginLeft: 20,
    },
    iconWrapper: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 20,
    },
})