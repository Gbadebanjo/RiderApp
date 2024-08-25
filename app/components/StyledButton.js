import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
  fontSize = 18,
  loading,  //  Added Prop to handle loading state
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
      ]}
      disabled={loading}  // Disable button when loading
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={TextColor || '#fff'} />
        ) : (
          <Text style={[styles.text, { fontSize }, { color: TextColor || '#fff' }]}>
            {title}
          </Text>
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
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 10,  // Add some space between the text and icon
  },
});

export default StyledButton;
