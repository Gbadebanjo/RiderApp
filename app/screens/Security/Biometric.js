import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';
import { Entypo } from '@expo/vector-icons';
import Centerlogo from '../../components/centerlogo';

const biometricLogo = require('../../assets/GoogleIcon.png');

export default function Biometric({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Biometric</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate()}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Place your Thumb to setup your biometric</Text>  
            <View style={styles.mainContent}>

                <View>
                <Centerlogo logoSource={biometricLogo} logoWidth={100} logoHeight={100} />
                <Text style={styles.logoText}>Biometric</Text>
                </View>

                <StyledButton
                    title="Update"
                    onPress={() => navigation.navigate('Feedback')}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    iconName="angle-right" 
                    />
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
        alignSelf: 'flex-start',
    },
    mainContent: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoText:{
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
        alignSelf: 'center',
    },
});