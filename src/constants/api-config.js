export const apiConfig = {
  baseURL: 'https://norma.nomoreparties.space/api',
  endpoints: {
    ingredients: 'ingredients',
    orders: 'orders',
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout'
  },
  headers: {
    'Content-Type': 'application/json'
  }
}
