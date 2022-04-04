import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCES } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCy5mlBeMbzM1XWSynmWf0xQADX2gUhiIs";

    if (isLogin) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCy5mlBeMbzM1XWSynmWf0xQADX2gUhiIs";
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSucces(data.idToken));
    dispatch(autoLogOut(data.expiresIn));
  };
}

export function autoLogOut(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");

  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSucces(token));
        dispatch(autoLogOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
}

export function authSucces(token) {
  return {
    type: AUTH_SUCCES,
    token,
  };
}
