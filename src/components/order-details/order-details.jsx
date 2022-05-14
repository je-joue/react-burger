import React from 'react';
import styles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={`${styles['order-details-container']} pt-4 pr-25 pb-30 pl-25`}>
      <p className='text text_type_digits-large mb-8'>034536</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <div className={`${styles.done} mt-15 mb-15`} />
      <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
