import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

export default function PinSettings({ navigation }) {
    const { userDetails } = useContext(AppContext);

    // Check if pin exists from userDetails
    const pinExists = userDetails?.authsEnabled?.includes('pin');
    const [isPinEnabled, setIsPinEnabled] = useState(pinExists);

    useEffect(() => {
        setIsPinEnabled(pinExists);
    }, [pinExists]);

    // Handle switch toggle
    const handleToggleSwitch = () => {
        if (isPinEnabled) {
            // If toggling off
            setIsPinEnabled(false);
            // Handle the logic for turning off the pin (e.g., making API request to disable the pin)
            console.log('Pin turned off');
        } else {
            // If toggling on
            setIsPinEnabled(true);
            navigation.navigate('CreatePinScreen', { action: 'create' });
        }
    };

    // Handle navigation to change pin or create pin based on existence
    const handlePinNavigation = () => {
        if (pinExists) {
            navigation.navigate('PinPasswordScreen', { action: 'change' });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#111111" />
            <View style={styles.titleContainer}>
                <Feather name="chevron-left" size={24} color='#111' onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.subtitle}>Pin Management</Text>

            <View style={styles.toggle}>
                <Text>Pin</Text>
                <Switch
                    value={isPinEnabled}
                    onValueChange={handleToggleSwitch}
                    trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                    thumbColor={isPinEnabled ? '#111' : '#8a8a8a'}
                />
            </View>

            <TouchableOpacity style={styles.pinTouch}
                onPress={isPinEnabled ? handlePinNavigation : null} // Only allow press if pin is enabled
                disabled={!isPinEnabled} // Disable touch if pin is not enabled
            >
                <Text style={[styles.text, { color: isPinEnabled ? '#000000' : '#8a8a8a' }]}>
                    {pinExists ? 'Change Pin' : 'Create Pin'}
                </Text>
                <Feather name="chevron-right" size={20} color='#8a8a8a' onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 40,
        width: '100%',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0e0e0e',
        paddingHorizontal: 2,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
    },
    pinTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
