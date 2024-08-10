// import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledButton from '../../components/StyledButton';
import Centerlogo from '../../components/centerlogo';
// import { Formik } from 'formik';
// import InputField from '../../../components/InputField';
// import SelectInput from '../../../components/SelectInput';
import * as yup from 'yup'; 
import BackButton from '../../components/BackButton';
const googleLogo = require('./../../assets/GoogleIcon.png');
const appleLogo = require('./../../assets/AppleLogo.png');
import { FontAwesome } from '@expo/vector-icons';
// import axios from 'axios';

const validationSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zipcode: yup.string().optional(),
});

export default function Feedback({navigation}) {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
            <BackButton style={styles.Icon} />
            <TouchableOpacity style={styles.nextContainer} 
                onPress={()=> navigation.navigate('ThankYou')}>
                <Text style={styles.logoText}>Skip</Text>
                <FontAwesome name='angle-right' size={20} color="black" />
            </TouchableOpacity>
        </View>
        <Centerlogo align="left"/>
        <View>
            <Text style={styles.title}>RYDEPRO SIGN-UP FEEDBACK</Text>
            <Text style={styles.subTitle}>How would you rate the sign up process</Text>

            <View style={styles.thumbs}>
                <FontAwesome name='thumbs-o-up' size={30} color="black" />
                <FontAwesome name='thumbs-o-down' size={30} color="black" />
            </View>

            <Text style={styles.subTitle}>Thank you for rating our app! Would you like to leave a comment</Text>

                <StyledButton
                    title="Submit"
                    onPress={() => navigation.navigate('ThankYou')}
                    width="40%"
                    height={53}
                    paddingVertical={10}
                    marginTop={40}
                    backgroundColor="#212121"
                    borderWidth={2}
                    TextColor="#fff"
                    // iconName="angle-right" 
                    marginLeft='30%'
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
    fontSize: 20,
    marginTop: 40,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    marginTop: 40,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
  },
  thumbs: {
    marginTop: 25,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    justifyContent: 'space-between',
  },
});
