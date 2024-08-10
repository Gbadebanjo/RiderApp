import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import { Entypo } from '@expo/vector-icons';

export default function Security({navigation}) {

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
                    <View style={styles.iconText}>
                    <BackButton style={styles.Icon} />
                    <Text>Biometric</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color='black' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Biometric')}
                    >
                    <View style={styles.iconText}>
                    <BackButton style={styles.Icon} />
                    <Text>Facial ID</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color='black' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Biometric')}
                    >
                    <View style={styles.iconText}>
                    <BackButton style={styles.Icon} />
                    <Text>Passphrase</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color='black' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Biometric')}
                    >
                    <View style={styles.iconText}>
                    <BackButton style={styles.Icon} />
                    <Text>Pin</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color='black' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachSecurity}
                    onPress={() => navigation.navigate('Biometric')}
                    >
                    <View style={styles.iconText}>
                    <BackButton style={styles.Icon} />
                    <Text>Lock your Account</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color='black' />
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
        borderBottomWidth: 2,
        borderColor: '#98A0B3',
        marginTop: 20,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});