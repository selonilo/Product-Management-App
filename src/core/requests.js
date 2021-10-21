import axios from 'axios';
import * as paths from './paths';

export function login(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.login, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function register(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.register, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
