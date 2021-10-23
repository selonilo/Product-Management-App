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
import {setAccessToken, setRefreshToken} from '../../core/auth';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (!username || !password) {
      setLoading(false)
      return alert('Lütfen tüm alanları doldurun');
    }
    let body = {
      username: username,
      password: password,
    };
    services
      .login(body)
      .then(res => {
        console.log(res);
        setAccessToken(res.token);
        setRefreshToken(res.refreshToken);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeStack'}],
          }),
        );
      })
      .catch(err => console.log(err?.response))
      .finally(res => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>GİRİŞ YAP</Text>

        <View style={styles.usernameWrapper}>
          <TextInput
            label="Kullanıcı Adı"
            iconName={'label'}
            returnKeyType="next"
            value={username}
            onChangeText={text => {
              setUsername(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>

        <View style={styles.passwordWrapper}>
          <TextInput
            label="Şifre"
            iconName={'label'}
            returnKeyType="next"
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry
          />
        </View>
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={() => handleLogin()}>
          <Text>GİRİŞ YAP</Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <Text style={styles.registerText}>Hesabın yok mu ? Kayıt ol</Text>
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

export default LoginScreen;
