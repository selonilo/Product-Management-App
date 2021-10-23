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

export function getAllProduct() {
  return new Promise((resolve, reject) => {
    axios
      .get(paths.getAllProduct)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function addProduct(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.addProduct, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function deleteProductById(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.deleteProductById, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function editProductById(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.editProductById, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
