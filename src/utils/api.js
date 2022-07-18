import { apiConfig } from '../constants/api-config';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
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
    headers: apiConfig.headers,
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
  // console.log(JSON.stringify(data));
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








