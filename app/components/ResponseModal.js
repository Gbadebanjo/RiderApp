import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ResponseModal = ({
  visible,
  title,
  message,
  isSuccess,
  onDismiss,
  buttonTitle,
  backgroundColor = '#F5F5F5',
  color = '#7538EC',
  width = '40%'
}) => {
  const iconName = isSuccess ? 'check' : 'times';
  const iconColor = 'white';
  const iconBackgroundColor = isSuccess ? '#5dae64' : '#980D0D'; 

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
            <FontAwesome name={iconName} size={35} color={iconColor}/>
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={[styles.button, {backgroundColor}, {width}]} onPress={onDismiss}>
            <Text style={[styles.buttonText, {color}]}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100vh',
  },
  modalView: {
    paddingBottom: 30,
    width: '100%',
    height: '100vh',
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    marginBottom: 15,
    textAlign: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#7538EC',
    borderWidth: 1,
    // backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    // color: '#7538EC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResponseModal;
