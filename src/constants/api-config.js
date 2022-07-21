export const apiConfig = {
  baseURL: 'https://norma.nomoreparties.space/api',
  endpoints: {
    ingredients: 'ingredients',
    orders: 'orders',
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    passwordForgot: 'password-reset',
    passwordReset: 'password-reset/reset',
    user: 'auth/user',
    updateToken: 'auth/token'
  },
  headers: {
    'Content-Type': 'application/json'
  }
}

