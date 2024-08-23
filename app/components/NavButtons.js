import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MenuLanding from '../screens/Dashboard/MenuLanding';
import Account from '../screens/Dashboard/Account';
import Services from '../screens/Services/Services';
import BookRide from '../screens/Ride/BookRide';
import BookingHistory from '../screens/History/BookingHistory';
import Edit from '../screens/Dashboard/Edit';
import Settings from '../screens/Dashboard/Settings';

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
            <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
            <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function NavButtons() {
    return (
        <Tab.Navigator initialRouteName="Menu" screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false, tabBarShowLabel: true, tabBarStyle: styles.tabBar, tabBarActiveTintColor: '#000', tabBarInactiveTintColor: 'gray', tabBarLabelStyle: styles.tabBarLabel, tabBarIconStyle: styles.tabBarIcon, }}>
            <Tab.Screen name="BookRide" component={BookRideStack} options={{
                tabBarLabel: 'Book Ride', tabBarIcon: ({ color }) => (
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
                    <AntDesign name="appstore-o" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="Menu" component={MenuStack} options={{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="user-o" size={24} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        paddingTop: 5,
        borderTopColor: '#fff',
        height: 70,
        paddingBottom: 10,
    },
    tabBarLabel: {
        fontSize: 12,
        paddingBottom: 5,
    },
    tabBarIcon: {
        marginBottom: -5,
    },
})

export default NavButtons;