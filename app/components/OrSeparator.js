import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrSeparator = () => {
  return (
    <View style={styles.orContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>Or</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
    orContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
       },
      orText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#CCCCCC',
       },
});

export default OrSeparator;