import { postOrder } from "../../utils/api";

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const IS_ORDER_EMPTY = 'IS_ORDER_EMPTY';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const sendOrderRequest = () => {
  return {
    type: SEND_ORDER_REQUEST
  }
}

export const sendOrderSuccess = (orderNumber) => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload: orderNumber
  }
};

export const sendOrderFailed = () => {
  return {
    type: SEND_ORDER_FAILED
  }
}

export const closeOrderDetails = () => {
  return {
    type: CLOSE_ORDER_DETAILS
  }
}

export const isOrderEmpty = () => {
  return {
    type: IS_ORDER_EMPTY
  }
}

export const sendOrder = (ids) => {
  return function(dispatch) {
    if (!ids.length) return dispatch(isOrderEmpty());
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



  // const handleOrderButtonClick = () => {
  //   sendOrder(constructorState.ids)
  //   .then(setOrderDetailsOpened(true))
  //   .then(constructorDispatcher({ type: 'setOrderNumberLoading' }))
  //   .then(res => constructorDispatcher({ type: 'setOrderNumber', payload: res.order.number }))
  //   .catch(err => constructorDispatcher({ type: 'setError', payload: 'Что-то пошло не так...' }));
  // }
