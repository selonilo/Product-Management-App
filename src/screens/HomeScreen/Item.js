import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {theme} from '../../core/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as services from '../../core/requests';

const Item = ({item,deleteProductById}) => {
  const Content = ({label, value}) => {
    return (
      <View style={styles.contentWrapper}>
        <Text style={styles.label}>{label} </Text>
        <Text style={styles.name}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          deleteProductById();
        }}
        style={styles.iconWrapper}>
        <AntDesign name="delete" size={30} color={theme.colors.error} />
      </TouchableOpacity>
      <Content label="Adı:" value={item?.name} />
      <Content label="Stok Durumu:" value={item?.quantity} />
      <Content label="Marka:" value={item?.brand} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: theme.colors.secondary,
  },
  name: {
    color: '#000',
    fontSize: 15,
  },
  label: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 40,
    zIndex: 122,
  },
});

export default Item;
