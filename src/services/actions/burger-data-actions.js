import { fetchIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsRequest = () => ({
  type: GET_INGREDIENTS_REQUEST,
})

export const getIngredientsSuccess = (ingredients) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: ingredients,
})

export const getIngredientsFailed = () => ({
  type: GET_INGREDIENTS_FAILED,
})

export const getIngredients = () => {
  return function(dispatch) {
    dispatch(getIngredientsRequest());
    fetchIngredients()
    .then(json => {
      dispatch(getIngredientsSuccess(json.data))
    })
    .catch(err => {
      alert('Ошибка при загрузке данных');
      dispatch(getIngredientsFailed());
    });
  }
}
