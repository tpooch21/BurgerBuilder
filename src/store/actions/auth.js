import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId: authData.localId,
  token: authData.idToken,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const requestBody = {
      email,
      password,
      returnSecureToken: true,
    };

    // If method is true, that means we're signing UP
    // If false, user is signing IN
    // assign appropriate url according to auth method
    const url = method
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw3qRZzTdajHubRFMZvspQoVkOwlGPYvw"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw3qRZzTdajHubRFMZvspQoVkOwlGPYvw";

    axios
      .post(url, requestBody)
      .then((res) => {
        // extract time from current date object, add expiresIn to time, convert BACK into a date object
        const expiration = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiration", expiration);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirect = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path: path,
});

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiration = new Date(localStorage.getItem("expiration"));
      if (expiration > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout((expiration.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
