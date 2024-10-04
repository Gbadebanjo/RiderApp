import React, { useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const BotLoading = ({ navigation }) => {
  const scaleValue = new Animated.Value(2);

  useEffect(() => {
    // Start the pop-up animation
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 0.8,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('ChatBot'); // Replace so user can't go back to loading screen
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer if the component unmounts
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../../assets/Robot.png')} // Replace with your bot image
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default BotLoading;
