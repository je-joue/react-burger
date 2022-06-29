import { postOrder } from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SET_ORDER_EMPTY = 'SET_ORDER_EMPTY';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const sendOrderRequest = () => ({
  type: SEND_ORDER_REQUEST
})

export const sendOrderSuccess = (orderNumber) => ({
  type: SEND_ORDER_SUCCESS,
  payload: orderNumber
})

export const sendOrderFailed = () => ({
  type: SEND_ORDER_FAILED
})

export const closeOrderDetails = () => ({
  type: CLOSE_ORDER_DETAILS
})

export const setOrderEmpty = () => ({
  type: SET_ORDER_EMPTY
})

export const sendOrder = (ids) => {
  return function(dispatch) {
    if (!ids.length) return dispatch(setOrderEmpty());
    dispatch(sendOrderRequest());
    postOrder(ids)
    .then(json => {
      dispatch(sendOrderSuccess(json.order.number))
    })
    .catch(err => {
      alert('Ошибка');
      dispatch(sendOrderFailed());
    })
  }
}
