import React, {useState} from 'react';
import api from '../../api/auth'
import { StyleSheet, Text, View, StatusBar, TextInput, Keyboard, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import StyledButton from '../../components/StyledButton';

export default function CreatePassphrase({navigation, route}) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passPhrase, setPassPhrase] = useState('');
    const { email } = route.params;

    const handleCreate = async () => {
        setLoading(true);

        try {
            const response = await api.createPassphrase(email, passPhrase);
            Keyboard.dismiss();
            
            if (!response.ok) {
                setLoading(false);
                const errorMessage = response.data.message || response.data.data?.message || 'An error occurred';
                return setErrorMessage(errorMessage);
            }

            console.log(response.data);
            setLoading(false);
            Alert.alert(response.data.message);
            return navigation.navigate('Feedback');
        } catch (error) {
            console.error("API call error:", error);
            setLoading(false);
            Alert.alert("An error occurred. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Passphrase</Text>
            </View>  
            <Text style={styles.subTitle}>Passphrase is a sequence of words or phrases used as a password, which is typically longer and more secure than a single-word password</Text>  
            <View style={styles.mainContent}>

             {errorMessage ? <Text style={styles.bigerrorText}>{errorMessage}</Text> : null}

                <View style={styles.generateContainer}>
                    <Text style={styles.generateText}>Create Passphrase</Text>

                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        textAlignVertical="center"
                        onChangeText={setPassPhrase}
                        value={passPhrase}
                    />

                    <StyledButton
                        title="Save"
                        onPress={handleCreate}
                        width="100%"
                        height={53}
                        loading={loading}
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
    bigerrorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
        justifyContent: 'center',
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