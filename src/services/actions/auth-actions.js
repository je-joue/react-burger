import { login, register, logout } from "../../utils/api";
import { setCookie, getCookie, removeCookie } from "../../utils/cookies";

// const setCookie = (name, value) => document.cookie = `${name}=${value}`;

// const getCookie = (name) => {
//   const matches = document.cookie.match(
//     new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
//   );
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

// const removeCookie = (name) => document.cookie = `${name}=;expires=${new Date(0)}`;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

// export const SEND_LOGOUT_REQUEST = "SEND_LOGOUT_REQUEST";
// export const LOGOUT_SUCCESSED = "LOGOUT_SUCCESSED";
// export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const CHECK_TOKEN_REQUEST = "CHECK_TOKEN_REQUEST";
export const CHECK_TOKEN_SUCCESS = "CHECK_TOKEN_SUCCESS";
export const CHECK_TOKEN_NOT_SUCCESS = "CHECK_TOKEN_NOT_SUCCESS";
export const CHECK_TOKEN_FAILED = "CHECK_TOKEN_FAILED";

// export const SEND_UPDATE_REQUEST = "SEND_UPDATE_REQUEST";
// export const UPDATE_SUCCESSED = "UPDATE_SUCCESSED";
// export const UPDATE_FAILED = "UPDATE_FAILED";

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


export function loginUser(user) {
  return function (dispatch) {
    dispatch(loginRequest());
    login(user)
      .then((res) => {
        dispatch(loginSuccess(res.user));
        setCookie('token', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch((err) => {
        dispatch(loginFailed());
        alert('Неверный логин или пароль');
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

// export function sendLogoutRequest() {
//   return function (dispatch) {
//     dispatch({
//       type: SEND_LOGOUT_REQUEST,
//     });

//     const data = {
//       token: localStorage.getItem("refreshToken"),
//     };

//     api.logoutFromAccount(data)
//       .then((res) => {
//         if (res.success) {
//           localStorage.removeItem("refreshToken");
//           removeCookie("token");

//           dispatch({
//             type: LOGOUT_SUCCESSED,
//           });
//         }
//       })
//       .catch((err) => {
//         dispatch({
//           type: LOGOUT_FAILED,
//         });
//         logErrorToConsole(err);
//       });
//   };
// }

// export function checkAuthUser() {
//   return function (dispatch) {
//     dispatch({
//       type: CHECK_TOKEN_REQUEST,
//     });

//     api.getUserData()
//       .then((res) => {
//         dispatch({
//           type: CHECK_TOKEN_SUCCESSED,
//           payload: res.user,
//         });
//       })
//       .catch((err) => {
//         if (err === "401 Unauthorized") {
//           dispatch({
//             type: CHECK_TOKEN_UNSUCCESSED,
//           });
//         } else {
//           dispatch({
//             type: CHECK_TOKEN_FAILED,
//           });
//           logErrorToConsole(err);
//         }
//       });
//   };
// }

// export function updateUserInfo(data) {
//   return function (dispatch) {
//     dispatch({
//       type: SEND_UPDATE_REQUEST,
//     });

//     api.updateUserData(data)
//       .then((res) => {
//         dispatch({
//           type: UPDATE_SUCCESSED,
//           payload: res.user,
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           type: UPDATE_FAILED,
//         });
//         logErrorToConsole(err);
//       });
//   };
// }

// --------- !!! ----------

// import {baseUrl, checkResponse} from '../../utils/utils.js';

// const LOGIN = 'LOGIN';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// const LOGIN_FAILED = 'LOGIN_FAILED';

// function login(email, password) {

//   return function(dispatch) {
//     dispatch({
//       type: LOGIN,
//       isLoading: true,
//       isFailed: false,
//       isAuth: false
//     })

//     fetch(`${baseUrl}/auth/login`,
//       {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referrer',
//         body: JSON.stringify({
//           "email": email,
//           "password": password
//         })
//       }
//     )
//     .then(checkResponse)
//     .then(res => dispatch({
//       type: LOGIN_SUCCESS,
//       isLoading: false,
//       isFailed: false,
//       user: res.user,
//       accessToken: res.accessToken,
//       refreshToken: res.refreshToken,
//       isAuth: true,
//       isLogoutChecked: true
//     }))
//     .catch(err => dispatch({
//       type: LOGIN_FAILED,
//       isLoading: false,
//       isFailed: true,
//       isAuth: false,
//       isLogoutChecked: true
//     }))
//   }
// }

// export {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, login};
