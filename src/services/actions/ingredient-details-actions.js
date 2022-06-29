export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const setIngredientDetails = (ingredient) => ({
  type: SET_INGREDIENT_DETAILS,
  payload: ingredient
})

export const closeIngredientDetails = () => ({
  type: CLOSE_INGREDIENT_DETAILS
})
