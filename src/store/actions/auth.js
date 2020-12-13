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
    console.log(method);
    const url = method
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw3qRZzTdajHubRFMZvspQoVkOwlGPYvw"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw3qRZzTdajHubRFMZvspQoVkOwlGPYvw";

    axios
      .post(url, requestBody)
      .then((res) => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => dispatch(authFail(err)));
  };
};
