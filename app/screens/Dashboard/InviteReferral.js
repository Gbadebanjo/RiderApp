import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const InviteReferral = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.headcontainer}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" size={24} color="black" />
                    <Text style={styles.head}>Invite Referral</Text>
                </TouchableOpacity>
                <View style={styles.subcontainer}>
                    <Text style={styles.texthead}>Earn 15% Off with Referrals!</Text>
                    <Text style={styles.text}>-Refer a friend and get 15% off your next 20 rides once they book! The more you refer, the more you save!</Text>
                    <Text style={styles.text}>-Discounts are non-transferable and expire, so start referring now! Terms and conditions apply</Text>
                    <View style={styles.referrallinkcontainer}>
                        <Text style={styles.referrallink}>Referral code<Text style={styles.code}> JULYRIDE2024</Text></Text>
                        <TouchableOpacity style={styles.copy}>
                            <Ionicons name="share-social-outline" size={28} color="#292D32" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subcontainer}>
                    <Text style={styles.texthead}>Earn up to $10,000 for Each Referral!</Text>
                    <Text style={styles.text}>-Know a Company or Organization (including government and consulates)? Refer them and earn a commission of up to $10,000 when they contract with us! Fill out the form and start earning your commission plus discounts today! Terms and conditions apply</Text>
                    <View style={styles.referrallinkcontainer}>
                        <Text style={styles.referrallink}>Referral code<Text style={styles.code}> JULYRIDE2024</Text></Text>
                        <TouchableOpacity style={styles.copy}>
                            <Ionicons name="share-social-outline" size={28} color="#292D32" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.notice}>
                    <FontAwesome name="exclamation-circle" size={24} color="#000" />
                    <Text style={styles.text1}>Valid until the official launch in your City or State.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default InviteReferral

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
        marginBottom: 20,
    },
    texthead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#464646',
        marginBottom: 10,
    },
    referrallinkcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderTopColor: '#E0E0E0',
        marginTop: 20,
        padding: 10,
    },
    referrallink: {
        fontSize: 16,
        color: '#161718',
    },
    code: {
        fontWeight: 'bold',
    },
    copy: {
        backgroundColor: '#E0E0E0',
        borderRadius: 30,
        padding: 10,
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    text1: {
        fontSize: 12,
        color: '#464646',
        marginLeft: 20,
    },

})