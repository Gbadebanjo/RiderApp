import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

const FeedbackModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedRating, setSelectedRating] = useState(null);
  const [feedback, setFeedback] = useState('');

  const ratings = [
    { emoji: '😡', label: 'Poor' },
    { emoji: '😢', label: 'Fair' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😁', label: 'Excellent' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Close Button */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.titleText}>Thank you for signing up!</Text>
          <Text style={styles.subText}>
            We’re always looking to improve our app and would love to hear about your experience
          </Text>

          {/* Rating Section */}
          <Text style={styles.rateText}>Rate your experience</Text>
          <View style={styles.ratingContainer}>
            {ratings.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.ratingItem,
                  selectedRating === item.label && styles.selectedRating,
                ]}
                onPress={() => setSelectedRating(item.label)}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Feedback Input */}
          <Text style={styles.feedbackText}>
            What should we add or change about the product to make it better for you
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Please tell us about your experience"
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.continueButton, feedback ? styles.buttonActive : styles.buttonInactive]}
            disabled={!feedback}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
      alignSelf: 'flex-end',
  },
  closeText: {
      fontSize: 12,
      borderWidth: 1,
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 100,
      textAlign: 'center',
      color: '#000',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 5,
  },
  rateText: {
    fontSize: 16,
    fontWeight: '500',
      marginTop: 15,
    color: '#464646',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  ratingItem: {
    alignItems: 'center',
  },
  selectedRating: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 14,
      marginTop: 5,
    color: '#09286D4D',
  },
  feedbackText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    height: 50,
    marginTop: 10,
  },
  continueButton: {
    marginTop: 20,
    width: '100%',
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#555',
  },
  buttonInactive: {
    backgroundColor: '#CCC',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FeedbackModal;
