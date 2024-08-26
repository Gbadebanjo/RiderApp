import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

export default function Security({navigation, route}) {
    const { email } = route.params;
    // console.log(email)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Security</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.goBack()}>
                </TouchableOpacity>
            </View>    
            <View>
                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Biometric')}
                    >
                    <View style={styles.fingerprint}>
                        <Ionicons name="finger-print" size={15} color='black' />
                    </View>
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Biometric</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('FacialID')}
                    >
                    <AntDesign name="scan1" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Facial ID</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Passphrase', { email })}
                    >
                    <MaterialCommunityIcons name="line-scan" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Passphrase</Text>
                        <Entypo name="chevron-small-right" size={20} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Pin' , { email })}
                    >
                    <FontAwesome name="user-secret" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Pin</Text>
                        <Entypo name="chevron-small-right" size={23} color='black' />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    // onPress={() => navigation.navigate('Biometric')}
                    >
                    <MaterialCommunityIcons name="lock-off-outline" size={25} color='black' />
                    <View style={styles.iconText}>
                        <Text style={styles.text}>Lock your Account</Text>
                        <Entypo name="chevron-small-right" size={23} color='black' />
                    </View>
                </TouchableOpacity>
            </View>        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    eachSecurity: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    iconText: {
        flexDirection: 'row',
        width: '89%',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderColor: '#98A0B3',
        paddingBottom: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#464646',
    },
    fingerprint: {
       borderWidth: 1.5,
       borderRadius: 8,
       padding: 2,
    }
});