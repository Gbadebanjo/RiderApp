import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MenuLanding from '../screens/Dashboard/MenuLanding';
import Services from '../screens/Services/Services';
import BookRide from '../screens/Ride/BookRide';
import BookingHistory from '../screens/History/BookingHistory';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BookRideStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BookRide" component={BookRide} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function BookingHistoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BookingHistory" component={BookingHistory} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ServicesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Services" component={Services} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MenuLanding" component={MenuLanding} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function NavButtons() {
    return (
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true, headerShown: false, tabBarShowLabel: true, tabBarStyle: styles.tabBar}}>
            <Tab.Screen name="BookRide" component={BookRideStack} options={{
                tabBarLabel: 'Book Ride',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="car" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="BookingHistory" component={BookingHistoryStack} options={{
                tabBarLabel: 'Booking History',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="book" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="Services" component={ServicesStack} options={{
                tabBarLabel: 'Services',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="appstore1" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="Menu" component={MenuStack} options={{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="menufold" size={24} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    }
})

export default NavButtons;