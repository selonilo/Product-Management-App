import React, {Fragment, useEffect, useCallback} from 'react';
import {CommonActions} from '@react-navigation/native';
import {
  authenticationRequest,
  removeAccessToken,
  stateAxiosHeader,
  getAccessToken,
} from '../core/auth';
import {useDispatch} from 'react-redux';
import {Platform, Linking, Alert, Text, View} from 'react-native';
import * as actions from '../redux/modules/auth/auth.action';
import {theme} from '../core/theme';

import {Circle} from 'react-native-animated-spinkit';

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch();

  const saveUser = user => dispatch(actions.saveUser(user));

  useEffect(() => {
    setTimeout(() => {
      checkEnvironmentAndAuth();
      _getUser();
    }, 1000);
  }, []);

  const checkEnvironmentAndAuth = async () => {
    await authenticationRequest(navigation);
    // getKeywords();
  };

  async function _getUser() {
    try {
      // axios.defaults.baseURL = Paths.baseUrl;
      const user = await getAccessToken();

      if (user) {
        await stateAxiosHeader();
        await saveUser(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'TabNavigator'}],
          }),
        );
      } else {
        removeAccessToken();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'unAuthStack'}],
          }),
        );
      }
    } catch (error) {}
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
      }}>
      <Circle size={120} color={theme.colors.white} />
      <Text
        style={{
          fontSize: 22,
          color: theme.colors.white,
          marginTop: 25,
          fontWeight: 'bold',
        }}>
        CMV
      </Text>
    </View>
  );
}
