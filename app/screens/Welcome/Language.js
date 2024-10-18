import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function Language({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [otherLanguage, setOtherLanguage] = useState('');
  const languages = ['English', 'Spanish', 'Chinese', 'French', 'German', 'Japanese', 'Other'];
  const pickerRef = useRef(null);

  const openModal = () => {
    pickerRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownTop(py + height);
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    closeModal();
    navigation.navigate('Onboarding');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language Selection</Text>
      <Text style={styles.subtitle}>What is your preferred language?</Text>

      {/* Custom Picker */}
      <TouchableOpacity
        ref={pickerRef}
        style={styles.picker}
        onPress={openModal}
      >
        <Text style={styles.pickerText}>{selectedLanguage}</Text>
        <Entypo name="chevron-small-down" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      {isModalVisible && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="none"
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <View style={[styles.dropdownContainer, { top: dropdownTop }]}>
              <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleLanguageSelect(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Show Text Input if "Other" is selected */}
      {selectedLanguage === 'Other' && (
        <View style={styles.otherInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Please specify"
            value={otherLanguage}
            onChangeText={setOtherLanguage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row', 
  },
  pickerText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute', 
    width: '89%',
    marginLeft: '5.5%',
    backgroundColor: '#fff',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    maxHeight: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 1,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  otherInputContainer: {
    marginTop: '5%',
  },
  otherLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#DADADA',
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});



