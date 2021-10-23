import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import {removeAccessToken, removeRefreshToken} from '../../core/auth';
import {CommonActions} from '@react-navigation/native';
import * as services from '../../core/requests';
import Item from './Item';

const HomeScreen = ({navigation}) => {
  const [product, setProduct] = useState({
    brand: 'Apple',
    category: 'Phone',
    name: 'Apple Watch',
    quantity: 2,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'unAuthStack'}],
      }),
    );
  };
  const addProduct = () => {
    setLoading(true);
    services
      .addProduct(product)
      .then(res => {
        alert(res?.message);
      })
      .catch(err => console.log(err))
      .finally(res => setLoading(false));
  };

  const getAll = () => {
    
  }
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={() => {
          addProduct();
        }}>
        <Text>ÜRÜN EKLE</Text>
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => logout()}>
        <Text>ÇIKIŞ YAP</Text>
      </Button>
      {/* <FlatList
        data={result}
        keyExtractor={(item, index) => item?.id}
        renderItem={({item}) => <Item item={item} />}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  button: {
    height: 60,
    width: '80%',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
});
