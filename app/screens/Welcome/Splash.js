import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import Logo from '../../assets/newRydeproLogo.png';

const Landing = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 9000, 
      useNativeDriver: true, 
    }).start();

    const timeout = setTimeout(() => {
        navigation.navigate('Onboarding');
    }, 9000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
      <Image source={Logo} style={{ width: 250, height: 200 }} /> 
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;
