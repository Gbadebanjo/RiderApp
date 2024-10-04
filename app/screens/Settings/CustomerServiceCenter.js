import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react'

const CustomerServiceCenter = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#212121" />
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.title}>Customer Service Center</Text>
                <AntDesign name="customerservice" size={24} color='#fff' />
            </View>
            <TouchableOpacity style={[styles.eachService, { backgroundColor: '#8A8A8A'}]} onPress={() => navigation.navigate('BotLoading')}>
                <Text style={styles.text}>Chatbot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.eachService, { backgroundColor: '#f5f7fa'}]} onPress={() => navigation.navigate('LiveChat')}>
                <Text style={styles.text}>Live Chat</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CustomerServiceCenter

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
        color: '#212121',  
    },
    eachService: {
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
})