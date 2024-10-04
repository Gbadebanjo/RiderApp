import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import React from 'react'

const HelpAndSupport = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#212121" />
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color='#fff'/>
            </TouchableOpacity>
            <Text style={styles.title}>Help and Support</Text>
            <AntDesign name="customerservice" size={24} color='#fff'/>
        </View>
        <TouchableOpacity style={styles.eachSecurity} onPress={() => navigation.navigate('CustomerServiceCenter')}>
            <Text style={styles.text}>Customer Service Center</Text>
            <AntDesign name="right" size={12} color='#fff'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eachSecurity}>
            <Text style={styles.text}>FAQs</Text>
            <AntDesign name="right" size={12} color='#fff'/>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HelpAndSupport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
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
        color: '#fff',
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
        color: '#fff',
        fontSize: 16,
    },
})
