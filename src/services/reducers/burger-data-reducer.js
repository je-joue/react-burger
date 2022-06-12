import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, INCREASE_COUNT, DECREASE_COUNT, RESET_COUNT } from "../actions/burger-data-actions";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const burgerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: action.payload, ingredientsFailed: false, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(el =>
          el._id !== action.payload.id
          ? (el.type !== 'bun' ? el : action.payload.type === 'bun' ? {...el, count: el.count = 0} : el)
          : (el.type === 'bun' ? {...el, count: el.count+=2} : {...el, count: el.count+=1})
        )
      }
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(el =>
          el._id !== action.payload
          ? el
          : {...el, count: el.count-=1})
      }
    }
    case RESET_COUNT: {
      return {
        ...state,
        ingredients:[...state.ingredients].map(el => ({...el, count: 0}))
      }
    }
    default: {
      return state;
    }
  }
};
