import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { getIngredients } from '../../services/actions/burger-data-actions';
import { WS_CONNECTION_START } from '../../services/actions/ws-actions';
import { wsConfig } from '../../constants/ws-config';
import { getCookie } from '../../utils/cookies';
import { getIngredientsInfo, getTimeStamp, getPrice } from '../../utils/helpers';
import { getIngredients } from '../../services/actions/burger-data-actions';
import IngredientIcon from '../ingredient-icon/ingredient-icon';

function OrderInfo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch("/feed/:id");

  const { id } = useParams();

  const ingredients = useSelector(store => store.burgerData.ingredients);
  const { orders } = useSelector(store => store.ws.orders);
  const [ currentOrder, setCurrentOrder ] = useState(null);

  useEffect(() => {
    if (!location.state) {
      if(match) {
        dispatch({ type: WS_CONNECTION_START, payload: `${wsConfig.baseURL}/${wsConfig.endpoints.allOrders}` });
      } else {
        const accessToken = getCookie("token");
        const wsUrl = `${wsConfig.baseURL}/${wsConfig.endpoints.userOrders}?token=${accessToken}`;
        dispatch({ type: WS_CONNECTION_START, payload: wsUrl });
      }
    }
  }, []);

  useEffect(() => {
    if(orders) {
      const current = orders.find(
        (order) => order._id === id
      );
      setCurrentOrder(current ? current : null);
    }

  }, [orders, id]);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <>
      {currentOrder && ingredients && (
        <div className={styles.container}>
          <p className='text text_type_digits-default mb-5'>{`#${currentOrder.number}`}</p>
          <p className='text text_type_main-medium mb-2'>{currentOrder.name}</p>
          <p className={`text text_type_main-default mb-15 ${styles['colored-text']}`}>{currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
          <div>
            <p className='text text_type_main-medium mb-8'>Состав:</p>
            <ul className={styles.list}>
              {getIngredientsInfo(currentOrder, ingredients).map((item) => (
                <li className={`${styles['list-item']} ${styles.row}`}>
                  <div className={styles.row}>
                    <div className={styles['icon-wrapper']}>
                      <IngredientIcon image={item.image} />
                    </div>
                    <p className='text text_type_main-default'>{item.name}</p>
                  </div>
                  <div className={styles.row}>
                    <p className='text text_type_digits-default mr-2'>{`${item.count} x ${item.price}`}</p>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.row}>
                <p className='text text_type_main-default text_color_inactive'>{getTimeStamp(currentOrder.createdAt)}</p>
                <div className={styles.row}>
                  <p className='text text_type_digits-default mr-2'>{getPrice(currentOrder, ingredients)}</p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  )
};

export default OrderInfo;



