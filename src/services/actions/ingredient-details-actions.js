export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const setIngredientDetails = (ingredient) => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: ingredient
  }
}

export const closeIngredientDetails = () => {
  return {
    type: CLOSE_INGREDIENT_DETAILS
  }
}
