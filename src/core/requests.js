import axios from "axios";
import * as paths from "./paths";

export function getRefreshToken(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(paths.refreshToken, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
