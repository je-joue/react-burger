import { login, register, logout, fetchWithRefresh } from "../../utils/api";
import { setCookie, getCookie, removeCookie } from "../../utils/cookies";
import { apiConfig } from "../../constants/api-config";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
})

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
})

export const loginFailed = () => ({
  type: LOGIN_FAILED,
})

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
})

export const registerSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  payload: userData,
})

export const registerFailed =() => ({
  type: REGISTER_FAILED
})

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const logoutFailed = () => ({
  type: LOGOUT_FAILED,
})

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
})

export const getUserSuccess = (userData) => ({
  type: GET_USER_SUCCESS,
  payload: userData
})

export const getUserFailed = () => ({
  type: GET_USER_FAILED,
})

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
})

export const updateUserSuccess = (userData) => ({
  type: UPDATE_USER_SUCCESS,
  payload: userData
})

export const updateUserFailed = () => ({
  type: UPDATE_USER_FAILED,
})

export function loginUser(user) {
  return function (dispatch) {
    dispatch(loginRequest());
    login(user)
      .then((res) => {
        if (res.success) {
          dispatch(loginSuccess(res.user));
          setCookie('token', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch(loginFailed());
        alert(err);
      });
  };
}

export function registerUser(user) {
  return function (dispatch) {
    dispatch(registerRequest());
    register(user)
      .then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(registerSuccess(res.user));
        }
      })
      .catch((err) => {
        dispatch(registerFailed());
        alert('Произошла ошибка')
      })
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch(logoutRequest());
    const data = {
      token: localStorage.getItem('refreshToken'),
    };
    logout(data)
      .then((res) => {
        if (res.success) {
          localStorage.removeItem('refreshToken');
          removeCookie('token');
          dispatch(logoutSuccess());
        }
      })
      .catch((err) => {
        dispatch(logoutFailed());
        alert(err);
      });
  };
}

export function getUserInfo() {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch(getUserRequest());
    fetchWithRefresh(`${apiConfig.baseURL}/${apiConfig.endpoints.user}`, {
      method: 'GET',
      headers: {
        ...apiConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.success) {
          dispatch(getUserSuccess(res.user));
        }
      })
      .catch((err) => {
        dispatch(getUserFailed());
        // alert(err);
      });
  };
}

export function updateUserInfo(body) {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch(updateUserRequest());
    fetchWithRefresh(`${apiConfig.baseURL}/${apiConfig.endpoints.user}`, {
      method: 'PATCH',
      headers: {
        ...apiConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.success) {
          dispatch(updateUserSuccess(res.user));
        }
      })
      .catch((err) => {
        dispatch(updateUserFailed());
        alert(err);
      });
  };
}
