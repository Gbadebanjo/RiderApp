import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';
import { Entypo } from '@expo/vector-icons';

export default function CreatePassphrase({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Passphrase</Text>
            </View>  
            <Text style={styles.subTitle}>Passphrase is a sequence of words or phrases used as a password, which is typically longer and more secure than a single-word password</Text>  
            <View style={styles.mainContent}>

                <View style={styles.generateContainer}>
                    <Text style={styles.generateText}>Create Passphrase</Text>

                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        textAlignVertical="top"
                    />

                    <StyledButton
                        title="Save"
                        onPress={() => navigation.navigate('Feedback')}
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

                {/* <View style={styles.generateContainer}>
                    <Text style={styles.generateText}>Manually Create Your Own Passphrase</Text>

                    <StyledButton
                        title="Create"
                        onPress={() => navigation.navigate('Feedback')}
                        width="100%"
                        height={53}
                        paddingVertical={10}
                        marginTop={20}
                        backgroundColor="#212121"
                        borderWidth={2}
                        TextColor="#fff"
                        iconName="angle-right" 
                    />
                    
                </View> */}
            </View>        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 11,
        width: '100%',
    },
    titleContainer: {
        marginTop: 30,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginLeft: '22%'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
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
        fontWeight: '700',
    },
    textInput: {
        marginTop: 15,
        borderColor: '#AAB1BC',
        borderWidth: 1,
        width: '100%',
        // height: 200,
        borderRadius: 8,
        padding: 10,
      }
});