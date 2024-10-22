import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../../components/StyledButton';

const SecurityIntro = ({navigation}) => {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Set up in-app two-factor authentication for enhanced security</Text>
                <View style={styles.textlayers}>
                    <Text style={styles.texts2}>
                        <Text style={styles.boldText2}>First Layer Option</Text>
                    </Text>
                    <Text style={styles.texts2}>
                        <Text>Facial Identification</Text>
                    </Text>
                    <Text style={styles.texts2}>
                        <Text>Fingerprint</Text>
                    </Text>
                </View>
                <View style={styles.textlayers}>
                    <Text style={styles.texts2}>
                        <Text style={styles.boldText2}>Secondary Layer Option</Text>
                    </Text>
                    <Text style={styles.texts2}>
                        <Text>Pin</Text>
                    </Text>
                    <Text style={styles.texts2}>
                        <Text>Passphrase</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
             <StyledButton
                title="Proceed"
                onPress={()=> navigation.navigate('Security')}
                width="40%"
                height={53}
                paddingVertical={10}
                marginTop={40}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                borderRadius={10}
                marginLeft='60%'
            />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    Alternatetexts: {    
        flex: 1,
        width: '100%',
    },
    texts: {    
        textAlign: 'center',
        marginTop: 25,
        color: '#0A0954',
        fontSize: 15,
    },
    texts2: {    
        textAlign: 'center',
        marginTop: 18,
        color: '#0A0954',
        fontSize: 15,
    },
    title: {
      marginTop: 10,
      fontWeight: '700',
      fontSize: 20,
      textAlign: 'center',
    },
    textlayers: {
      marginTop: 10,
    },
    boldText2: {
     marginTop: 20,
     fontWeight: 'bold',
     textAlign: 'center',
     fontSize: 18,
    },
    buttonContainer: {
      width: '100%',
      padding: 20,
      position: 'absolute',
      bottom: 0,
      alignItems: 'center',
    },
});

export default SecurityIntro;
