import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


function StyledButton({ title, onPress, width, marginRight, height,
    marginLeft, marginTop, marginBottom, backgroundColor, 
    borderWidth, borderColor, TextColor, iconName, paddingVertical, fontSize = 18 }) {
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
        {paddingVertical}
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, {fontSize}, { color: TextColor || '#fff' }]}>{title}</Text>
        {iconName && <FontAwesome name={iconName} size={22} color="#fff" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
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
  },
  text: {
    // fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    // position: 'absolute',
    // right: 10,
  },
});

export default StyledButton;