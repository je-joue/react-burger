import { ADD_INGREDIENT, DELETE_INGREDIENT, RESET_CONSTRUCTOR, REORDER_INGREDIENTS } from "../actions/burger-constructor-actions";
import update from 'immutability-helper';

const initialState = {
  bun: null,
  toppings: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {...state, bun: action.payload}
      }
      return {...state, toppings: [...state.toppings, action.payload]}
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
        toppings: []
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
