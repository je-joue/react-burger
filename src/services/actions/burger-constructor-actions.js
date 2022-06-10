import { nanoid } from "nanoid";
export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

export const addBun = (ingredient) => {
  return {
    type: ADD_BUN,
    payload: ingredient
  }
}

export const addTopping = (ingredient) => {
  return {
    type: ADD_TOPPING,
    payload: ingredient
  }
}

export const deleteIngredient = (key) => {
  return {
    type: DELETE_INGREDIENT,
    payload: key
  }
}

export const resetConstructor = () => {
  return {
    type: RESET_CONSTRUCTOR
  }
}



export const addIngredientOnClick = (ingredient) => {
  return function(dispatch) {
    const key = nanoid();
    ingredient.type === 'bun' ? dispatch(addBun(ingredient)) : dispatch(addTopping({...ingredient, key: key}));
  }
}


