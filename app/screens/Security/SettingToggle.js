import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import BackButton from '../../components/BackButton';

export default function SettingToggle() {
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [isPassphraseEnabled, setIsPassphraseEnabled] = useState(false);
    const [isPincodeEnabled, setIsPincodeEnabled] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.eachToggle}>
                <Text style={styles.text}>Password</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    value={isPasswordEnabled}
                    onValueChange={setIsPasswordEnabled}
                />
            </View>
            <View style={styles.eachToggle}>
                <Text style={styles.text}>Face ID</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    value={isFaceIdEnabled}
                    onValueChange={setIsFaceIdEnabled}
                />
            </View>
            <View style={styles.eachToggle}>
                <Text style={styles.text}>Biometric</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    value={isBiometricEnabled}
                    onValueChange={setIsBiometricEnabled}
                />
            </View>
            <View style={styles.eachToggle}>
                <Text style={styles.text}>Passphrase</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    value={isPassphraseEnabled}
                    onValueChange={setIsPassphraseEnabled}
                />
            </View>
            <View style={styles.eachToggle}>
                <Text style={styles.text}>Pincode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    value={isPincodeEnabled}
                    onValueChange={setIsPincodeEnabled}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
    },
    eachToggle: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
    },
});
