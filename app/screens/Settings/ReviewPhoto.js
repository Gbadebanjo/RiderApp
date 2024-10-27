import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import Centerlogo from '../../components/centerlogo';
import StyledButton from '../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dashboardClient, setAuthToken } from '../../api/client';
import { AppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';
import BackButton from '../../components/BackButton';

const { width } = Dimensions.get('window');
const circleDiameter = width * 0.7; 

export default function ReviewPhoto({ navigation, route }) {
  const { photo, facing } = route.params;
  const { userDetails, setUserDetails } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    setAuthToken(token);
    const formData = new FormData();
    formData.append('image', {
      uri: photo.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    try {
      const response = await dashboardClient.post('/update-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.ok) {
        console.log(response.data);
        setLoading(false);
        return Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
      Toast.show({
        type: 'success',
        text1: response.data.message,
      });
      setUserDetails({ ...userDetails, profileImg: response.data.image });
      navigation.navigate('SettingHome')
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.topContent}>
          <BackButton style={styles.backButton}/>
          <Text style={styles.text}>Review Your Photo</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photo.uri }}
              style={[
                styles.capturedImage,
                facing === 'front' ? { transform: [{ scaleX: -1 }] } : null, // Flip for front camera
              ]}
            />
          </View>

            <StyledButton
              title="Retake Picture"
              onPress={() => navigation.goBack()}
              width="40%"
              paddingVertical={10}
              marginTop='15%'
              marginLeft='30%'
              borderColor="#D0D0D0"
              borderWidth={1}
              backgroundColor="#fff"
              TextColor="#0E0E0E"
            />
        </View>
          <View style={styles.buttonContainer}>
            <StyledButton
              title="Update Profile Picture"
              loading={loading}
              onPress={handleSubmit}
              width="100%"
              height={50}
              paddingVertical={10}
              marginTop={10}
              backgroundColor="#212121"
              TextColor="#fff"
            />
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
  },
    backButton: {
    top: 20,
    left: 20,
  },
  imageContainer: {
    top: '5%',
    width: circleDiameter,
    height: circleDiameter,
    borderRadius: circleDiameter / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    marginTop: '10%',
    left: 20,
  },
  buttonContainer: {
    width: '90%',
    bottom: 30,
    marginLeft: '5%',
  },
});
