import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import BackButton from './BackButton';
import * as Clipboard from 'expo-clipboard';
import StyledButton from './StyledButton';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { generate, count } from "random-words";

const generatePhrase = () => {
    // const subjects = ["The cat", "A dog", "The bird", "A person", "The car"];
    // const verbs = ["jumps over", "runs towards", "flies above", "drives past", "looks at"];
    // const objects = ["the fence", "the tree", "the house", "the road", "the sky"];

    // const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    // const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    // const randomObject = objects[Math.floor(Math.random() * objects.length)];

    // return `${randomSubject} ${randomVerb} ${randomObject}.`;
    
        const words = generate({ exactly: 5, join: " " });
        return words;

}

export default function Passphrase ({ isVisible, navigation, onClose, onPassphraseGenerated }){
    const [isGenerateInputVisible, setGenerateIsInputVisible] = useState(false);
    const [generatedPassphrase, setGeneratedPassphrase] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isCreated, setIsCreated] = useState(false);


    const handleGeneratePress = () => {
        const newPassphrase = generatePhrase();
        setGeneratedPassphrase(newPassphrase);
        setInputValue(newPassphrase);
        setGenerateIsInputVisible(true);
    };

    const handleCreatePhrase = () => {
        setIsCreated(true);
    };

    const handelCreateNConfirm = () => {
        onPassphraseGenerated(inputValue);
        Toast.show({
            type: 'success', 
            text1: 'Copied to clipboard!',
          });
        setIsCreated(false);
        setInputValue('');
    }

    const handleSaveNCopy = () => {
        onPassphraseGenerated(generatedPassphrase); 
        Clipboard.setStringAsync(generatedPassphrase);
        Toast.show({
            type: 'success', 
            text1: 'Copied to clipboard!',
          });
        setGenerateIsInputVisible(false);
        setInputValue('');
    };

    return (
        <Modal
            visible={isVisible}
            onBackdropPress={onClose}
            onRequestClose={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            animationType="slide"
            transparent={true}
            style={styles.modal}
        >
            <View style={[styles.modalContent, isGenerateInputVisible && styles.modalContentExpanded]}>
                <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}> 
                    <BackButton style={styles.Icon} onPress={onClose} />
                    <Text style={styles.title}>Passphrase</Text>
                </View>  
                <Text style={styles.subTitle}>Passphrase is a sequence of words or phrases used as a password, which is typically longer and more secure than a single-word password</Text>  
                <View style={styles.mainContent}>

                    { !isCreated ? (
                    <>
                     <View style={styles.generateContainer}>
                                <Text style={styles.generateText}>Auto Generate Passphrase</Text>
                                {isGenerateInputVisible && (
                                    <TextInput
                                        style={styles.textInput}
                                        multiline={true}
                                        textAlignVertical="center"
                                        textAlign='center'
                                        value={inputValue}
                                        editable={false}
                                        selectTextOnFocus={true}
                                        onChangeText={setInputValue} />
                                )}
                                {isGenerateInputVisible ? (
                                    <StyledButton
                                        title="Save and Copy"
                                        onPress={handleSaveNCopy}
                                        width="100%"
                                        height={49}
                                        marginTop={20}
                                        paddingVertical={10}
                                        borderRadius={30}
                                        fontSize={16} />
                                ) : (
                                    <StyledButton
                                        title="Generate"
                                        onPress={handleGeneratePress}
                                        width="100%"
                                        height={49}
                                        marginTop={20}
                                        paddingVertical={10}
                                        borderRadius={30}
                                        fontSize={16} />
                                )}
                            </View>
                            <View style={styles.generateContainer}>
                                    <Text style={styles.generateText}>Manually Create Your Own Passphrase</Text>

                                    <StyledButton
                                        title="Create"
                                        onPress={handleCreatePhrase}
                                        width="100%"
                                        height={49}
                                        paddingVertical={10}
                                        marginTop={20}
                                        backgroundColor="#212121"
                                        borderRadius={30}
                                        TextColor="#fff"
                                        fontSize={16} />
                                </View>
                    </>
                    ) : (
                        <View style={styles.generateContainer}>

                            <Text style={styles.generateText}>Create Passphrase</Text>

                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                textAlignVertical="center"
                                textAlign='left'
                                value={inputValue}
                                editable={true}
                                selectTextOnFocus={true}
                                onChangeText={setInputValue}
                            />

                            <StyledButton
                                title="Confrim and Copy"
                                onPress={handelCreateNConfirm}
                                width="100%"
                                height={49}
                                paddingVertical={10}
                                marginTop={20}
                                backgroundColor="#212121"
                                borderRadius={30}
                                TextColor="#fff"
                                fontSize={16}
                            />
                        </View>
                )}
                </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '70%',
      },
      modalContentExpanded: {
        height: '80%',
    },
    container: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        width: '90%',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '400',
        width: '100%',
    },
    mainContent: {
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
    textInput: {
        marginTop: 15,
        borderColor: '#AAB1BC',
        borderWidth: 1,
        width: '100%',
        borderRadius: 8,
        padding: 15,
        color: '#000',
    },
});