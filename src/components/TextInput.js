import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {theme} from '../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Kohana} from 'react-native-textinput-effects';

export default function TextInput({errorText, ...props}) {
  return (
    <View style={styles.container}>
      <Kohana
        style={[
          {
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            paddingVertical: 10,
          },
        ]}
        clearButtonMode="always"
        iconClass={MaterialCommunityIcons}
        iconColor={theme.colors.primary}
        inputPadding={10}
        labelStyle={{
          color: theme.colors.secondary,
          textAlignVertical: 'center',
          paddingVertical: 15,
          paddingHorizontal: 10,
          fontSize: theme.fontSize.FONT_SIZE_14,
        }}
        inputStyle={{
          color: theme.colors.primary,
        }}
        useNativeDriver
        {...props}
      />

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    height: 65,
  },
  error: {
    fontSize: theme.fontSize.FONT_SIZE_13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
