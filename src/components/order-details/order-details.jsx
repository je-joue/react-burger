import React, { useContext } from 'react';
import styles from './order-details.module.css';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

function OrderDetails() {
  const { constructorState, constructorDispatcher } = useContext(BurgerConstructorContext);
  if (constructorState.orderError) {
    return (
      <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
        <div className='text text_type_main-medium'>{constructorState.orderError}</div>
      </div>
    )
  }
  if (constructorState.isOrderNumberLoading) {
    return (
      <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
        <div className={styles.preloader}></div> :
      </div>
    )
  }

  return (
    <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
      <p className='text text_type_digits-large mb-8'>{constructorState.orderNumber}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <div className={`${styles.done} mt-15 mb-15`} />
      <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
