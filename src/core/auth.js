import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

const getAccessToken = async () => {
  return await AsyncStorage.getItem('access_token');
};

const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refresh_token');
};

const setAccessToken = token => {
  AsyncStorage.setItem('access_token', token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

const setRefreshToken = token => {
  AsyncStorage.setItem('refresh_token', token);
};

const removeAccessToken = () => {
  AsyncStorage.removeItem('access_token');
  delete axios.defaults.headers.common['Authorization'];
};

const removeRefreshToken = () => {
  AsyncStorage.removeItem('refresh_token');
};

const stateAxiosHeader = async () => {
  const token = await getAccessToken();
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

let isRefreshing = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.map(cb => cb(token));
}

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

const authenticationRequest = navigation => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async function (error) {
      let originalRequest = {...error}.config;
      if (error?.response?.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          const accessToken = await getAccessToken();
          const refreshToken = await getRefreshToken();
          axios
            .post(
              refreshTokenPath, //refreshtokenpath
              {
                token: accessToken,
                refreshToken: refreshToken,
              },
              {headers: {Authorization: null}},
            )
            .then(res => {
              let {data = {}} = res;
              !data && (data = {});
              const {token, refreshToken} = data;
              setRefreshToken(refreshToken);
              setAccessToken(token);
              if (!token) return logout(navigation);
              isRefreshing = false;
              onRefreshed(token);
              subscribers = [];
            })
            .catch(err => {
              logoutnotActive(navigation);
            });
        }

        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      if (!error?.response?.status)
        return Promise.reject({...error, message: 'Bağlantı Hatası'});
      return Promise.reject(error);
    },
  );
};

const logout = async navigation => {
  isRefreshing = false;
  subscribers = [];

  removeAccessToken();
  removeRefreshToken();
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: 'LoginScreen'}],
    }),
  );
};

export {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  stateAxiosHeader,
  authenticationRequest,
};
