import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface ExampleProps {
  buttonText: string;
  onButtonPress: () => void;
}

export const Example: React.FC<ExampleProps> = (props) => {
  const {buttonText, onButtonPress} = props;

  return (
    <View>
      <Text style={styles.title}>
        uh hu
        <Button title={buttonText} onPress={onButtonPress} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
});
