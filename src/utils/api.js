import { apiConfig } from '../constants/api-config';
import { getCookie } from './cookies';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  // return Promise.reject(`Ошибка: ${res.status}`)
  // return Promise.reject(res);
  return res.json().then((res) => Promise.reject(res));
}

export const fetchIngredients = async () => {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.ingredients}`, {
    headers: apiConfig.headers
  });
  return checkResponse(res);
}

export async function postOrder(data) {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.orders}`, {
    method: 'POST',
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${getCookie('token')}`
    },
    body: JSON.stringify({
      "ingredients": data
    })
  });
  return checkResponse(res);
}

export async function login(data) {

  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.login}`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });

  return checkResponse(res);
}

export async function register(data) {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.register}`, {
    method: 'POST',
    referrerPolicy: 'no-referrer',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return checkResponse(res);
}

export async function logout(data) {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.logout}`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(data)
  });
  return checkResponse(res);
}

export async function resetPassword(data) {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.passwordForgot}`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  });
  return checkResponse(res);
}

export async function changePassword(data) {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.passwordReset}`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  });
  return checkResponse(res);
}

export async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await updateToken();
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

async function updateToken() {
  const res = await fetch(`${apiConfig.baseURL}/${apiConfig.endpoints.updateToken}`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
  });
  return checkResponse(res);
}




