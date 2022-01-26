/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-default-export */
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Alert} from 'react-native';

import {Example} from './components/Example';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Some text</Text>
      <StatusBar style="auto" />
      <Example
        buttonText="Hello from iOS"
        onButtonPress={() => Alert.alert('Yo')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
