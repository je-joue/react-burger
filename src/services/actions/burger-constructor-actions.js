import { nanoid } from "nanoid";
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';

export const deleteIngredient = (key) => ({
  type: DELETE_INGREDIENT,
  payload: key
})

export const resetConstructor = () => ({
  type: RESET_CONSTRUCTOR
})

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: {
    ...ingredient,
    key: nanoid()
  }
})

export const reorderIngredients = (dragIndex, hoverIndex) => ({
  type: REORDER_INGREDIENTS,
  dragIndex: dragIndex,
  hoverIndex: hoverIndex
})
