import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const LiveChat = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#212121" />
     
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.title}>Support</Text>
      </View>
      {/* Chat Section */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <Text style={styles.day}>Start Conversation</Text>
        {/* <View style={styles.message}>
          <Text style={styles.chatText}>Hi! I am Zara, an AI chatbot system. How may I help you?</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.chatText}>Please select a topic relevant to your query from below listed topics.</Text>
        </View> */}

        {/* Chat Options */}
        {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Login issues</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Booking Problems</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Payment issues</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>Account services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>More</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* Chat Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons  name="reload" size={24} color="#999" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Type your message here" placeholderTextColor="#888" />
        <TouchableOpacity>
          <Ionicons name="attach" size={26} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LiveChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginTop: 40,
    alignSelf: 'center',
  },
  day: {
    color: '#f9f9f9',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  message: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 15,
    marginBottom: 10,
    marginLeft : 20,
  },
  chatText: {
    color: '#111',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  chatButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 10,
    // flexBasis: '33%', // Gives all a fixed width
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#444',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
