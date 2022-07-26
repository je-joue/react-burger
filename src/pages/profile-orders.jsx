import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsConfig } from '../constants/ws-config';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/ws-actions';
import { getCookie } from '../utils/cookies';
import ProfileMenu from '../components/profile-menu/profile-menu';

import styles from './profile-orders.module.css';

import Preloader from '../components/preloader/preloader';
import OrdersList from '../components/orders-list/orders-list';

function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const { isFetching, orders } = useSelector(store => store.ws);

  useEffect(() => {
    const accessToken = getCookie("token");
    const wsUrl = `${wsConfig.baseURL}/${wsConfig.endpoints.userOrders}?token=${accessToken}`;
    dispatch({ type: WS_CONNECTION_START, payload: wsUrl });
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
          <div className={`mt-30 ${styles.container}`}>
            <ProfileMenu description="В этом разделе вы можете просмотреть свою историю заказов" />
            <OrdersList />
          </div>
        </>
      )}
    </>
  )
}

export default ProfileOrdersPage;
