import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, AntDesign } from '@expo/vector-icons';
import React from 'react'

const HelpAndSupport = ({ navigation }) => {
    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
      };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#212121" />
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color='#111' />
            </TouchableOpacity>
            <Text style={styles.title}>Help and Support</Text>
            <AntDesign name="customerservice" size={24} color='#0c0c0c'/>
        </View>
        <TouchableOpacity style={styles.eachSecurity} onPress={() => navigation.navigate('CustomerServiceCenter')}>
            <Text style={styles.text}>Customer Service Center</Text>
            <AntDesign name="right" size={12} color='#0c0c0c'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eachSecurity} onPress={() => openURL('https://mvp.katabenterprises.com')}>
            <Text style={styles.text}>FAQs</Text>
            <AntDesign name="right" size={12} color='#0c0c0c0'/>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HelpAndSupport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    title: {
        color: '#0c0c0c',
        fontSize: 20,
        flex: 1,
        paddingLeft: 20,
    },
    eachSecurity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    
    },
    text: {
        color: '#0c0c0c',
        fontSize: 16,
    },
})
