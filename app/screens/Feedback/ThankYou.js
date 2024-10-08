import React, {useEffect} from 'react';
import { StyleSheet, StatusBar, Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import StyledButton from '../../components/StyledButton';
import Centerlogo from '../../components/centerlogo';
const image = require('./../../assets/hello.png');

export default function ThankYou({navigation}) {
  // useEffect(() => {
  //   const fetchAndUpdateUserDetails = async () => {
  //     try {
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       token = JSON.parse(userToken);
  //       console.log(token);

  //     } catch (error) {
  //       console.error('Error updating user details:', error);
  //     }
  //   };

  //   fetchAndUpdateUserDetails();
  // });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Centerlogo align="left"/>
        <View>
            <Image source={image} style={styles.image} />

            <Text style={styles.title}>Thanks for Being an Early! </Text>
            <Text style={styles.subTitle}>Don’t Miss Out! Verify Your Email for Exclusive Promotions.</Text>

                <StyledButton
                    title="Return to Menu Tabs"
                    onPress={() => navigation.navigate('WelcomeHome')}
                    width="100%"
                    height={53}
                    paddingVertical={10}
                    marginTop={50}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    fontSize={16}
                    borderRadius={30}
                />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  Icon: {
    alignSelf: 'flex-start',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 14,
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    marginBottom: 30,
  },
  image: {
    marginTop: 25,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
