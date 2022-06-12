import { fetchIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const RESET_COUNT = 'RESET_COUNT';

export const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients,
  }
}

export const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}

const addCount = (data) => {
  data.forEach(element => element.count = 0);
  return getIngredientsSuccess(data)
}

export const getIngredients = () => {
  return function(dispatch) {
    dispatch(getIngredientsRequest());
    fetchIngredients()
    .then(json => {
      dispatch(addCount(json.data))
    })
    .catch(err => {
      alert('Ошибка при загрузке данных');
      dispatch(getIngredientsFailed());
    });
  }
}

export const increaseCount = (id, type) => {
  return {
    type: INCREASE_COUNT,
    payload: {id, type}
  }
}

export const decreaseCount = (id) => {
  return {
    type: DECREASE_COUNT,
    payload: id
  }
}

export const resetCount = () => {
  return {
    type: RESET_COUNT
  }
}
