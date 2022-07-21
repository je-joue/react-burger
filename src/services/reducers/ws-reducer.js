import {
  WS_CONNECTION_FETCHING,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../actions/ws-actions';

const initialState = {
  wsUrl: '',
  isFetching: false,
  wsConnected: false,
  orders: [],
  // total: undefined,
  // totalToday: undefined,
  error: undefined,
};

export const wsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case WS_CONNECTION_FETCHING: {
      return {
        ...state,
        isFetching: true,
        wsConnected: false,
        error: undefined,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        wsConnected: true,
        error: undefined,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        wsConnected: true,
        error: true,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        isFetching: false,
        wsConnected: false,
      };
    }
    case WS_GET_ORDERS: {
      const { orders, total, totalToday } = JSON.parse(payload);
      const filteredOrders = orders.filter((order) => {
        return order.ingredients.every((el) => el !== null);
      });

      return {
        ...state,
        error: undefined,
        orders: filteredOrders
        // orders: filteredOrders,
        // total,
        // totalToday,
      };
    }
    default:
      return state;
  }
}
