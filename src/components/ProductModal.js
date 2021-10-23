import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from '../core/theme';
import TextInput from './TextInput';
import Button from './Button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductModal = ({
  visible,
  onBackdropPress,
  productName,
  onChangeQuantity,
  onChangeName,
  onChangeBrand,
  quantity,
  brand,
  loading,
  onPress,
  label
}) => {
  return (
    <Modal
      animationInTiming={350}
      animationIn="slideInDown"
      isVisible={visible}
      backdropOpacity={0.7}
      onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onBackdropPress()}>
          <MaterialIcons
            name="cancel"
            size={40}
            style={{
              position: 'absolute',
              right: 5,
              top: 5,
              color: theme.colors.white,
            }}
          />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            label="Ürün Adı"
            iconName={'label'}
            returnKeyType="next"
            value={productName}
            onChangeText={onChangeName}
            autoCapitalize="none"
            keyboardType="default"
          />
          <TextInput
            label="Ürünün Adeti"
            iconName={'label'}
            returnKeyType="next"
            value={quantity}
            onChangeText={onChangeQuantity}
            autoCapitalize="none"
            keyboardType="default"
          />
          <TextInput
            label="Ürünün Markası"
            iconName={'label'}
            returnKeyType="next"
            value={brand}
            onChangeText={onChangeBrand}
            autoCapitalize="none"
            keyboardType="default"
          />
          <Button
            mode="contained"
            style={styles.button}
            loading={loading}
            onPress={() => onPress()}>
            <Text style={{color: theme.colors.primary}}>{label}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  inputWrapper: {
    height: 400,
    borderRadius: 15,
    justifyContent: 'space-around',
    marginTop: 40,
  },
  button: {
    height: 60,
    width: '80%',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: theme.colors.background,
  },
});

export default ProductModal;
