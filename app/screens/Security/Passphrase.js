import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';
import { Entypo } from '@expo/vector-icons';

export default function Passphrase({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Passphrase</Text>
                <TouchableOpacity
                    style={styles.Icon}
                    onPress={() => navigation.navigate()}>
                    <Entypo name="dots-three-vertical" size={18} />
                </TouchableOpacity>
            </View>  
            <Text style={styles.subTitle}>Passphrase is a sequence of words or phrases used as a password, which is typically longer and more secure than a single-word password</Text>  
            <View style={styles.mainContent}>

                <View style={styles.generateContainer}>
                    <Text style={styles.generateText}>Auto Generate Passphrase</Text>

                    <StyledButton
                        title="Generate"
                        onPress={() => navigation.navigate('GeneratePassphrase')}
                        width="100%"
                        height={53}
                        paddingVertical={10}
                        marginTop={20}
                        backgroundColor="#212121"
                        borderWidth={2}
                        TextColor="#fff"
                        iconName="angle-right" 
                    />
                    
                </View>

                <View style={styles.generateContainer}>
                    <Text style={styles.generateText}>Manually Create Your Own Passphrase</Text>

                    <StyledButton
                        title="Create"
                        onPress={() => navigation.navigate('CreatePassphrase')}
                        width="100%"
                        height={53}
                        paddingVertical={10}
                        marginTop={20}
                        backgroundColor="#212121"
                        borderWidth={2}
                        TextColor="#fff"
                        iconName="angle-right" 
                    />
                    
                </View>
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
        fontWeight: '400',
        width: '100%',
    },
    mainContent: {
        flex: 1,
        width: '100%',
        gap: 50,
        marginTop: 20,
    },
    generateContainer: {
        marginTop: 20,
    },
    generateText:{
        fontSize: 16,
        fontWeight: '500',
    },
});