import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

export default function SelectLanguage({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { label: 'English', code: 'en' },
    { label: 'Français (Canada)', code: 'fr' },
    { label: 'Español (Estados Unidos)', code: 'es' },
    { label: 'Português (Brasil)', code: 'pt' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.headContainer} onPress={() => navigation.goBack()} >
        <View style={styles.iconContainer}>
          <FontAwesome name="angle-left" size={24} color="#0e0e0e" />
        </View>
        <Text style={styles.head}>Language</Text>
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageOption}
            onPress={() => setSelectedLanguage(language.label)}
          >
            <Text style={styles.languageText}>{language.label}</Text>
            {selectedLanguage === language.label && (
              <FontAwesome name="circle" size={20} color="#0e0e0e" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.notice}>
        You must force quit and restart the app for language selections to take effect.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    width: 30,
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    justifyContent: 'center',
    alignSelf: 'auto',
  },
  languageContainer: {
    padding: 10,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  languageText: {
    fontSize: 16,
    color: '#0e0e0e',
  },
  notice: {
    padding: 10,
    fontSize: 12,
    color: '#999',
    // textAlign: 'center',
  },
});
