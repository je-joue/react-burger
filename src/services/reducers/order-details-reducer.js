import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED, SET_ORDER_EMPTY, CLOSE_ORDER_DETAILS } from "../actions/order-details-action";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  isOrderDetailsOpen: false,
  isOrderEmpty: true
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        isOrderDetailsOpen: true,
        isOrderEmpty: false
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        orderRequest: false,
        isOrderEmpty:false
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: true,
        // isOrderDetailsOpen: false
      }
    }
    case SET_ORDER_EMPTY: {
      return {
        ...state,
        isOrderDetailsOpen: true,
        isOrderEmpty: true
      }
    }
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state,
        order: null,
        orderRequest: false,
        orderFailed: false,
        isOrderDetailsOpen: false,
        isOrderEmpty: true
      }
    }
    default: {
      return state;
    }
  }
}
