import { ADD_BUN, ADD_TOPPING, DELETE_INGREDIENT, RESET_CONSTRUCTOR } from "../actions/burger-constructor-actions";

const initialState = {
  bun: null,
  toppings: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_TOPPING: {
      return {
        ...state,
        toppings: [...state.toppings, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        toppings: [...state.toppings].filter(topping => topping.key !== action.payload),
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        toppings: [],
        ids: []
      }
    }
    default: {
      return state;
    }
  }
};
