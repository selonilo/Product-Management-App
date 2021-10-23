import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import {removeAccessToken, removeRefreshToken} from '../../core/auth';
import {CommonActions} from '@react-navigation/native';
import * as services from '../../core/requests';
import Item from './Item';
import ProductModal from '../../components/ProductModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(false);
  let emptyProduct = {
    name: '',
    brand: '',
    quantity: 0,
  };
  const [label, setLabel] = useState('');
  const [product, setProduct] = useState(emptyProduct);

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
  const getAllProduct = () => {
    services
      .getAllProduct()
      .then(res => setResult(res))
      .catch(err => console.log(err));
  };

  const deleteProductById = item => {
    services
      .deleteProductById({id: item?.id})
      .then(res => {
        console.log(res);
        getAllProduct();
      })
      .catch(err => console.log(err));
  };

  const addProduct = () => {
    if (!product.name || !product.brand || !product.quantity) {
      return alert('Lütfen tüm alanları doldurun');
    }
    let body = {
      brand: product.brand,
      name: product.name,
      quantity: product.quantity,
    };
    setLoading(true);
    services
      .addProduct(body)
      .then(res => {
        getAllProduct();
        setTimeout(() => {
          alert(res?.message);
        }, 400);
      })
      .catch(err => alert(err?.response?.data?.message))
      .finally(res => {
        setLoading(false);
        setVisible(false);
      });
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => logout()}>
          <MaterialCommunityIcons
            name="exit-to-app"
            size={28}
            color={theme.colors.error}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const editProductById = item => {
    setVisible(true);
    setProduct({
      name: item?.name,
      brand: item?.brand,
      quantity: item?.quantity,
    });
    setLabel('ÜRÜNÜ GÜNCELLE');
  };
  const editProduct = () => {
    alert('ürün güncelleme servisi buraya yazılacak');
  };
  return (
    <View style={styles.container}>
      <ProductModal
        visible={visible}
        onBackdropPress={() => setVisible(!visible)}
        quantity={String(product?.quantity)}
        brand={product?.brand}
        productName={product?.name}
        loading={loading}
        label={label}
        onChangeName={text => setProduct({...product, name: text})}
        onChangeBrand={text => setProduct({...product, brand: text})}
        onChangeQuantity={text => setProduct({...product, quantity: text})}
        onPress={() => (label === 'ÜRÜN EKLE' ? addProduct() : editProduct())}
      />
      <Button
        mode="contained"
        style={styles.button}
        loading={loading}
        onPress={() => {
          setVisible(true);
          setProduct(emptyProduct);
          setLabel('ÜRÜN EKLE');
        }}>
        <Text>ÜRÜN EKLE</Text>
      </Button>
      <FlatList
        data={result}
        style={{marginTop: 15}}
        keyExtractor={(item, index) => item?.id}
        renderItem={({item}) => (
          <Item
            editProductById={() => editProductById(item)}
            deleteProductById={() => deleteProductById(item)}
            item={item}
          />
        )}
      />
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
