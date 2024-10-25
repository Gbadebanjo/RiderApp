import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import StyledButton from './StyledButton';

const SecurityIntroModal = ({ modalVisible, setModalVisible, navigation }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Two Factor Authentication</Text>
                    <Text style={styles.subtitle}>Set up in-app two-factor authentication for enhanced security</Text>
                    
                    {/* First Layer Options */}
                    <View style={styles.textlayers}>
                        <Text style={styles.texts2}>
                            <Text style={styles.boldText2}>First Layer Option</Text>
                        </Text>
                        <Text style={styles.texts2}>Facial Identification</Text>
                        <Text style={styles.texts2}>Fingerprint</Text>
                    </View>

                    {/* Secondary Layer Options */}
                    <View style={styles.textlayers}>
                        <Text style={styles.texts2}>
                            <Text style={styles.boldText2}>Secondary Layer Option</Text>
                        </Text>
                        <Text style={styles.texts2}>Pin</Text>
                        <Text style={styles.texts2}>Passphrase</Text>
                    </View>

                    {/* Proceed Button */}
                    <StyledButton
                        title="Proceed to Security Settings"
                        onPress={() => {
                            setModalVisible(false); 
                            navigation.navigate('Security');
                        }}
                        width="100%"
                        height={53}
                        paddingVertical={10}
                        backgroundColor="#212121"
                        borderWidth={2}
                        marginTop={20}
                        TextColor="#fff"
                        borderRadius={10}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background transparency
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#F8F8F8',
        padding: 20,
        // paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    texts2: {
        textAlign: 'left',
        marginTop: 18,
        color: '#3C3C3C',
        fontWeight: '400',
        fontSize: 15,
    },
    title: {
        width: '100%',
        textAlign: 'left',
        marginTop: 5,
        fontWeight: '700',
        fontSize: 18,
    },
    subtitle: {
        marginTop: 10,
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'left',
    },
    textlayers: {
        width: '100%',
        marginTop: 5,
    },
    boldText2: {
        marginTop: 15,
        fontWeight: '500',
        fontSize: 16,
        color: '#000000',
    },
});

export default SecurityIntroModal;
