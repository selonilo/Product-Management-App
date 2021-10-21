import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../core/theme';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import * as services from '../../core/requests';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [gsmNo, setGSMNo] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleRegister = () => {
    let body = {
      email: email,
      gsmNo: gsmNo,
      name: name,
      surname: surname,
    };
    services
      .register(body)
      .then(res => {
        navigation.navigate('LoginScreen');
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>KAYIT OL</Text>

        <View style={styles.usernameWrapper}>
          <TextInput
            label="Ad"
            iconName={'label'}
            returnKeyType="next"
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput
            label="Soyadı"
            iconName={'label'}
            returnKeyType="next"
            value={surname}
            onChangeText={text => {
              setSurname(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <View style={styles.passwordWrapper}>
          <TextInput
            label="E-Posta"
            iconName={'label'}
            returnKeyType="next"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput
            label="GSM No"
            iconName={'label'}
            returnKeyType="next"
            value={gsmNo}
            onChangeText={text => {
              setGSMNo(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleRegister()}>
          <Text>GİRİŞ YAP</Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={styles.registerText}>Hesabın var mı ? Giriş yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: 34,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginVertical: 50,
  },
  usernameWrapper: {
    marginTop: 20,
  },
  passwordWrapper: {
    marginTop: 20,
  },
  button: {
    height: 60,
    width: '80%',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  registerText: {
    color: theme.colors.lightBlue,
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterScreen;
