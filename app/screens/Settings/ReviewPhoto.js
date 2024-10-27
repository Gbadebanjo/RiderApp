import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Alert } from 'react-native';
import Centerlogo from '../../components/centerlogo';
import StyledButton from '../../components/StyledButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dashboardClient, setAuthToken } from '../../api/client';
import { AppContext } from '../../context/AppContext';
import Toast from 'react-native-toast-message';

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
      navigation.navigate('ProfileDetails');
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
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photo.uri }}
            style={[
              styles.capturedImage,
              facing === 'front' ? { transform: [{ scaleX: -1 }] } : null, // Flip for front camera
            ]}
          />
        </View>
        <Centerlogo />
        <Text style={styles.text}>Review Your Photo</Text>
        <View style={styles.controlsContainer}>
          <View style={styles.buttonContainer}>
            <StyledButton
              title="Submit"
              loading={loading}
              onPress={handleSubmit}
              width="100%"
              height={50}
              paddingVertical={10}
              marginTop={10}
              backgroundColor="#212121"
              TextColor="#fff"
            />
            <StyledButton
              title="Retake"
              onPress={() => navigation.goBack()}
              width="100%"
              height={50}
              paddingVertical={10}
              marginTop={10}
              backgroundColor="#fff"
              TextColor="#212121"
            />
          </View>
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
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: '20%',
    width: 350,
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  controlsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    bottom: 30,
  },
});
