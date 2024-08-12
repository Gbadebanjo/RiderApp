import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { Entypo } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';

const biometricLogo = require('../../assets/GoogleIcon.png');

export default function FacialID({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Facial ID</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate()}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Scan your face for authentication</Text>  
            <View style={styles.mainContent}>

                <TouchableOpacity
                onPress={()=> navigation.navigate('Feedback')}>
                    <Centerlogo logoSource={biometricLogo} logoWidth={100} logoHeight={100} />
                    <Text style={styles.logoText}>Face ID</Text>
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
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        // alignSelf: 'flex-start',
    },
    mainContent: {
        marginTop: 100,
    },
    logoText:{
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        alignSelf: 'center',
    },
});