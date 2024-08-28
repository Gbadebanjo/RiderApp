// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../components/StyledButton';
import Centerlogo from '../../components/centerlogo';
import BackButton from '../../components/BackButton';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
// import axios from 'axios';


export default function Feedback({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
            <BackButton style={styles.Icon} />
            <TouchableOpacity style={styles.nextContainer} 
                onPress={()=> navigation.navigate('MenuLanding')}>
                <Text style={styles.logoText}>Skip</Text>
                <FontAwesome name='angle-right' size={20} color="black" />
            </TouchableOpacity>
        </View>
        <Centerlogo align="left"/>
        <View>
            <Text style={styles.title}>RYDEPRO SIGN-UP FEEDBACK</Text>
            <Text style={styles.subTitle}>How would you rate the sign up process</Text>

            <View style={styles.thumbs}>
                <TouchableOpacity style={styles.eachThumb} onPress={() => alert('Thumbs Up clicked')}>
                    <FontAwesome name='thumbs-o-up' size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.eachThumb} onPress={() => alert('Thumbs Up clicked')}>
                    <FontAwesome name='thumbs-o-down' size={30} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.subTitle}>Thank you for rating our app! Would you like to leave a comment</Text>

            <TextInput
              style={styles.textInput}
              multiline={true}
              textAlignVertical="top"
            />

                <StyledButton
                    title="Submit"
                    onPress={() => navigation.navigate('ThankYou')}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    marginBottom={20}
                />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 0,
  },
  Icon: {
    alignSelf: 'flex-start',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
  },
  thumbs: {
    marginTop: 25,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    justifyContent: 'space-between',
    gap: 10,
  },
  eachThumb:{
    backgroundColor: '#D3D3D3',
    padding: 12,
    borderRadius: 50,
  },
  textInput: {
    marginTop: 15,
    borderColor: '#AAB1BC',
    borderWidth: 1,
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 0,
    padding: 10,
  }
});
