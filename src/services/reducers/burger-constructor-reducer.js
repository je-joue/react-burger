import { ADD_BUN, ADD_TOPPING, DELETE_INGREDIENT, RESET_CONSTRUCTOR, REORDER_INGREDIENTS } from "../actions/burger-constructor-actions";
import update from 'immutability-helper';

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
    case REORDER_INGREDIENTS: {
      return {
        ...state,
        toppings: update(state.toppings, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.toppings[action.dragIndex]],
          ],
        })
      }
    }
    default: {
      return state;
    }
  }
};
