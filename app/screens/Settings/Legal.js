import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { FontAwesome, AntDesign } from '@expo/vector-icons';


const Legal = ({ navigation }) => {
    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
      };

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.headcontainer} onPress={() => navigation.goBack()} >
            <TouchableOpacity style={styles.headcontainer}>
            <FontAwesome name="angle-left" size={20} color="#0e0e0e" />
            </TouchableOpacity>
            <Text style={styles.head}>Legal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.each} onPress={() => openURL('https://mvp.katabenterprises.com')}>
            <Text style={styles.text}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.each} onPress={() => openURL('https://mvp.katabenterprises.com')}>
            <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.each} onPress={() => openURL('https://mvp.katabenterprises.com')}>
            <Text style={styles.text}>Licenses</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Legal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    headcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    head: {
        fontSize: 18,
        fontWeight: '500',
        color: '#0e0e0e',
        textAlign: 'center',
        flex: 1,
    },
    each: {
        paddingVertical: 15,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#0e0e0e',
    },
})