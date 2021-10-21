import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {theme} from '../../core/theme';
import TextInput from '../../components/TextInput';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Seri No"
        iconName={'barcode'}
        returnKeyType="next"
        // value={value}
        // onChangeText={onChangeText}
        autoCapitalize="none"
        style={styles.textInput}
        keyboardType="default"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default LoginScreen;
