import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../../core/theme';

const Item = ({item}) => {
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
      <Content label="Adı:" value={item?.name} />
      <Content label="Kategori:" value={item?.category.name} />
      <Content label="Stok Durumu:" value={item?.stock?.amount} />
      <Content label="Marka:" value={item?.brand?.name} />
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
});

export default Item;
