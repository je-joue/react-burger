import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './orders-stats.module.css';

function OrdersStats() {
  const { orders, total, totalToday } = useSelector(store => store.ws.orders);
  console.log(orders);

  const [ordersDone, setOrdersDone] = useState([]);
  const [ordersInProcess, setOrdersInProcess] = useState([]);

  useEffect(() => {
    if (orders) {
      const ordersDone = orders.filter((item) => {
        return item.status === 'done';
      });
      setOrdersDone(ordersDone);

      const ordersInProcess = orders.filter((item) => {
        return item.status === 'pending';
      });
      setOrdersInProcess(ordersInProcess);
    }
  }, [orders]);


  return (
    <section className={styles.container}>
      <div className={styles['orders-board-container']}>
        <div className={styles['orders-board-column']}>
          <p className='text text_type_main-medium mb-6'>Готовы:</p>
          <ul className={styles['orders-board-list']}>
            {ordersDone && ordersDone.map((order) => (
              <li className={`text text_type_digits-default mb-2 ${styles['orders-board-item__type_done']}`} key={order._id}>{order.number}</li>
            ))}
          </ul>
        </div>
        <div className={styles['orders-board-column']}>
          <p className='text text_type_main-medium mb-6'>В работе:</p>
          <ul className={styles['orders-board-list']}>
            {ordersInProcess && ordersInProcess.map((order) => (
              <li className={`text text_type_digits-default mb-2`} key={order._id}>{order.number}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles['orders-total-container']} mt-15`}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{total}</p>
      </div>
      <div className={`${styles['orders-total-container']} mt-15`}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{totalToday}</p>
      </div>
    </section>
  )
}

export default OrdersStats;
