import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import SecurityPix from '../../../assets/securityIntro.png';
import StyledButton from '../../../components/StyledButton';

const Alltexts = () => (
    <View style={styles.Alltexts}>
        <Text style={styles.title}>RYDEPRO In-App Security</Text>
        <Text style={styles.texts}> 
            <Text style={styles.boldText}>Secure Payments: </Text>
            <Text>Encrypted transactions</Text>
        </Text>
        <Text style={styles.texts}> 
            <Text style={styles.boldText}>Data Privacy: </Text>
            <Text> Your data is safe</Text>
        </Text>
        <Text style={styles.texts}> 
            <Text style={styles.boldText}>Real-time Monitoring: </Text>
            <Text>24/7 activity checks</Text>
        </Text>
        <Text style={styles.texts}> 
            <Text style={styles.boldText}>Two-Factor Authentication: </Text>
            <Text>Extra account security</Text>
        </Text>
        <Text style={styles.texts}> 
            <Text style={styles.boldText}>Regular Updates: </Text>
            <Text>Frequent security enhancements</Text>
        </Text>
    </View>
  );

const Alternatetexts = () => (
    <View style={styles.Alternatetexts}>
        <Text style={styles.title}>In-App Two Layer Security Options</Text>
        <View style={styles.textlayers}>
            <Text style={styles.texts2}> 
                <Text style={styles.boldText2}>First Layer</Text>
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
                <Text style={styles.boldText2}>Secondary Layer</Text>
            </Text>
            <Text style={styles.texts2}> 
                <Text>Pin</Text>
            </Text>
            <Text style={styles.texts2}> 
                <Text>Passphrase</Text>
            </Text>
        </View>
    </View>
);

export default function SecurityIntro ({ navigation }){
const [showAlternate, setShowAlternate] = useState(false);

useEffect(() => {
    const timer = setInterval(() => {
      setShowAlternate(prev => !prev);
    }, 5000); 

    return () => clearInterval(timer); 
  }, []);

  const handleSubmit = () => {
    navigation.navigate('SetupSecurity');
  }

  
  return (
    <SafeAreaView style={styles.container}>
        <Image source={SecurityPix} style={{ width: '90%', height: undefined, aspectRatio: 1, resizeMode: 'contain', marginTop: 25 }} /> 
        <View style={styles.content}>
            {showAlternate ? <Alternatetexts /> : <Alltexts />}
            <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, showAlternate ? styles.inactive : styles.active]} />
                <View style={[styles.indicator, showAlternate ? styles.active : styles.inactive]} />
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <StyledButton
                title="Cancel"
                onPress={()=> navigation.goBack()}
                width="30%"
                paddingVertical={8}
                marginTop={0}
                backgroundColor="#FFFFFF"
                borderWidth={0}
                TextColor="#212121"
                borderRadius={10} 
                fontSize={15}
            />

            <StyledButton
                title="Proceed"
                onPress={handleSubmit}
                width="30%"
                paddingVertical={8}
                marginTop={0}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                borderRadius={10} 
                fontSize={15}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    content: {
      flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    Alltexts: {    
        flex: 1,
        width: '90%',
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
    boldText: {
     fontWeight: 'bold',
     textAlign: 'center',
     fontSize: 15,
    },
    boldText2: {
     marginTop: 20,
     fontWeight: 'bold',
     textAlign: 'center',
     fontSize: 18,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    indicatorContainer: {
      flexDirection: 'row',
      gap: 2,
      marginBottom: 20,
    },
    indicator: {
        width: 11,
        height: 11,
        borderRadius: 5,
        marginHorizontal: 2,
      },
      active: {
        backgroundColor: '#212121',
      },
      inactive: {
        backgroundColor: '#ccc',
      },
  });