import { SET_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details-actions";

const initialState = {
  currentIngredient: {},
  isIngredientDetailsOpen: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: action.payload,
        isIngredientDetailsOpen: true
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return { ...state, currentIngredient: {}, isIngredientDetailsOpen: false };
    }
    default: {
      return state;
    }
  }
};
