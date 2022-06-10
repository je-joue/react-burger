import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './order-details.module.css';
import Preloader from '../preloader/preloader';

function OrderDetails() {
  const { order, orderRequest, orderFailed, isOrderEmpty } = useSelector(store => store.orderDetails);
  // if (orderFailed) {
  //   return (
  //     <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
  //       <p className='text text_type_main-medium'>ОШИБКА</p>
  //     </div>
  //   )
  // }
  if (orderRequest) {
    return (
      <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
        <Preloader />
      </div>
    )
  }
  if (isOrderEmpty) {
    return (
      <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
        <p className='text text_type_main-medium'>Выберете ингредиенты</p>
      </div>
    )
  }

  return (
    <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
      <p className='text text_type_digits-large mb-8'>{order}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <div className={`${styles.done} mt-15 mb-15`} />
      <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
