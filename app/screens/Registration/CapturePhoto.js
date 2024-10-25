import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome6 } from '@expo/vector-icons';
import StyledButton from '../../components/StyledButton';
import BackButton from '../../components/BackButton';

export default function Photo({ navigation }) {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef(null);

  // Check permission status on mount
  useEffect(() => {
    if (permission && !permission.granted) {
      setShowModal(true); // Show modal if permission is not granted
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const handlePermissionRequest = async () => {
    const result = await requestPermission();
    if (!result.granted) {
      setShowModal(true);
    }
  };

  if (!permission.granted) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextHead}>Allow Camera Access</Text>
            <Text style={styles.modalText}>
              By enabling Facial ID or Biometric authentication, you agree to
              allow RYDEPRO to securely store and access your biometric data.
              This data will be used solely for authentication purposes and
              will not be shared with third parties.
            </Text>
            <Text style={styles.modalText}>
              Your privacy and security are our top priorities. Thank you for
              helping us keep your account safe!
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                  navigation.goBack(); // Dismiss modal and go back
                }}
              >
                <Text style={styles.buttonText}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                  handlePermissionRequest(); // Request permission again
                }}
              >
                <Text style={styles.buttonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate('ReviewPhoto', { photo, facing });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlayContainer}>
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.captureArea}
            facing={facing}
            ref={cameraRef}
          />
        </View>
        <BackButton/>
        <Text style={styles.text}>Capture Passport photo</Text>

        <View style={styles.controlsContainer}>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.captureSwitch}
              onPress={() => {
                setFacing(facing === 'back' ? 'front' : 'back');
              }}
            >
              <FontAwesome6 name="arrows-rotate" size={24} color="#212121" />
            </TouchableOpacity>
                      
            <StyledButton
              title="Update Profile Picture"
              onPress={takePicture}
              width="100%"
              height={50}
              paddingVertical={10}
              marginTop={10}
              backgroundColor="#212121"
              TextColor="#fff"
            />
            <StyledButton
              title="Cancel"
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
  cameraContainer: {
    position: 'absolute',
    top: '20%',
    width: 350,
    height: 400,
    borderRadius: 50,
    overflow: 'hidden',
  },
  captureArea: {
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
  captureSwitch: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    height: 350,
    backgroundColor: '#212121',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTextHead: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  modalText: {
    color: '#D3D3D3',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    paddingTop: 10,
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
