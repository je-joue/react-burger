import { apiConfig } from '../constants/api-config';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const fetchIngredients = () => {
  return fetch(`${apiConfig.baseURL}ingredients`, {
    headers: apiConfig.headers
  })
  .then(res => checkResponse(res))
}

export function sendOrder(data) {
  return fetch(`${apiConfig.baseURL}orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      "ingredients": data
    })
  })
  .then(checkResponse)
}
