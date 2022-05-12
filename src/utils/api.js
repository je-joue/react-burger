import { apiConfig } from '../constants/api-config';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getIngredients = () => {
  return fetch(`${apiConfig.baseURL}ingredients`, {
    headers: apiConfig.headers
  })
  .then(res => checkResponse(res))
}