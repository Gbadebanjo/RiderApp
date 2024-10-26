import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome, Feather, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const MilesPoint = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.headcontainer}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome name="angle-left" size={24} color="#0c0c0c" />
                <Text style={styles.head}>Miles Points </Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
                <Text style={styles.text}><Text style={styles.texthead}>Earn as You Go:</Text> For every mile you travel, you’ll rack up miles points. It’s like a treasure hunt on wheels!
                </Text>
                <Text style={styles.text}><Text style={styles.texthead}>Dynamic Accumulation: </Text> These points accumulate with each journey, creating a dynamic frequent miles program. The more you ride, the more you earn!</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Redeem with Excitement:</Text>Redeem with Excitement: Cash back rewards, exclusive perks—your points are your passport to a world of RYDEPRO benefits. Redeem them with a smile.
                    <Text style={styles.texthead}> And guess what?</Text> The upcoming Rhodium Dynamic Rewards Program is the cherry on top! So, hop aboard, earn, and enjoy the ride.</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Disclaimer:</Text> Terms and conditions apply. Stay tuned for updates on the upcoming Rhodium Dynamic Rewards program.</Text>
            </View>
        </SafeAreaView>
    )
}

export default MilesPoint

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
        marginTop: 10,
        backgroundColor: '#f9f9f9',
    },
    text: {
        fontSize: 16,
        color: '#0e0e0e',
        marginTop: 20,
    },
    texthead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0e0e0e',
    }
})