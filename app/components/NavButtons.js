import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MenuLanding from '../screens/Dashboard/MenuLanding';
import ProfileDetails from '../screens/Settings/ProfileDetails';
import PromotionsScreen from '../screens/Promotions/PromotionsScreen';
import ProfileLanding from '../screens/Profile/ProfileLanding';
import Edit from '../screens/Settings/Edit';
import Settings from '../screens/Dashboard/Settings';
import WelcomeHome from '../screens/HomeScreens/WelcomeHome';
import SettingHome from '../screens/Settings/SettingHome';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeHome" component={WelcomeHome} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileLanding" component={ProfileLanding} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function PromotionsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingHome" component={SettingHome} options={{ headerShown: false }} />
            <Stack.Screen name="MenuLanding" component={MenuLanding} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function NavButtons() {
    return (
        <Tab.Navigator initialRouteName="HomeStack" screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false, tabBarShowLabel: true, tabBarStyle: styles.tabBar, tabBarActiveTintColor: '#000', tabBarInactiveTintColor: 'gray', tabBarLabelStyle: styles.tabBarLabel, tabBarIconStyle: styles.tabBarIcon, }}>
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
                tabBarLabel: 'Home', tabBarIcon: ({ color }) => (
                    <AntDesign name="car" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="user-o" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="PromotionsStack" component={PromotionsStack} options={{
                tabBarLabel: 'Promotions',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="book" size={24} color={color} />
                )
            }} />
            <Tab.Screen name="SettingsStack" component={SettingsStack} options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                    <Ionicons name="settings-outline" size={24} color={color} />
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