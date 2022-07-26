import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsConfig } from '../constants/ws-config';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/ws-actions';

import styles from './feed.module.css';

import Preloader from '../components/preloader/preloader';
import OrdersStats from '../components/order-stats/orders-stats';
import OrdersList from '../components/orders-list/orders-list';

function FeedPage() {
  const dispatch = useDispatch();
  const { isFetching, orders } = useSelector(store => store.ws);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `${wsConfig.baseURL}/${wsConfig.endpoints.allOrders}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : (
        <>
          <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
          <div className={styles['main-columns']}>
            <OrdersList />
            <OrdersStats />
          </div>
        </>
      )}
    </>
  )
}

export default FeedPage;
