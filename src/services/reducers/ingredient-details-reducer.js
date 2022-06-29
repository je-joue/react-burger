import { SET_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details-actions";

const initialState = {
  currentIngredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: action.payload
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return { ...state, currentIngredient: null };
    }
    default: {
      return state;
    }
  }
};
