import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StyledButton from './StyledButton';

const SecurityModal = ({ visible, onClose, onProceed }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
      <MaterialIcons name="security" size={90} color="black" />
        <Text style={styles.modalText}>
          To ensure your account remains safe and secure, 
          we require you to set up an additional layer of security. 
          This step will help protect your personal information and enhance your account’s security. 
          Click <Text style={styles.proceedText}>'Proceed'</Text> to view and choose from the available security options.
        </Text>
        <StyledButton
          title="Proceed"
          width="70%"
          paddingVertical={12}
          marginTop={10}
          backgroundColor="#111"
          borderWidth={0}
          TextColor="#FFFFFF"
          borderRadius={7}
          fontSize={14}
          onPress={onProceed}
        />
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
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 27,
  },
  proceedText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SecurityModal;