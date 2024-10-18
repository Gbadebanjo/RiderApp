import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

function StyledButton({
  title,
  onPress,
  width,
  marginRight,
  height,
  marginLeft,
  marginTop,
  marginBottom,
  backgroundColor,
  borderWidth,
  borderColor,
  TextColor,
  iconName,
  paddingVertical,
  fontSize = 16,
  loading, 
  borderRadius= 10,
  appleLogo,
  googleLogo,
  emailLogo
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: backgroundColor || '#212121' },
        { width },
        { height },
        { marginRight },
        { marginLeft },
        { marginTop },
        { marginBottom },
        { borderWidth },
        { borderColor },
        { paddingVertical },
        {borderRadius}
      ]}
      disabled={loading}  // Disable button when loading
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={TextColor || '#fff'} />
        ) : (
          <>
            {appleLogo && <AntDesign name="apple1" size={20} color={TextColor || '#fff'}/>}
            {googleLogo && <Image source={googleLogo} style={styles.logo} />}
            {emailLogo && <MaterialCommunityIcons name="email-outline" size={20} color={TextColor || '#fff'}/>}
            <Text style={[styles.text, { fontSize }, { color: TextColor || '#fff' }]}>
              {title}
            </Text>
          </>
        )}
        {!loading && iconName && (
          <FontAwesome name={iconName} size={22} color="#fff" style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 17,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    marginLeft: 10,  
  },
  logo: {
    width: 20,
    height: 20,
  },
});

export default StyledButton;
