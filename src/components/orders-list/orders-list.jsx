import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsInfo, getTimeStamp, getPrice } from '../../utils/helpers';
import IngredientIcon from '../ingredient-icon/ingredient-icon';


import styles from './orders-list.module.css';

function OrdersList() {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const { orders } = useSelector(store => store.ws.orders);
  const ingredients = useSelector(store => store.burgerData.ingredients);

  const images = (order) => {
    return order.ingredients.map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient).image_mobile;
    })
  }

  const imagesToShow = (order) => images(order).slice(0, 6);

  const more = (order) => order.ingredients.length - 6;

  return (
    <section className={styles.container}>
      <ul className={`${styles['orders-list']} ${styles.list}`}>
        {orders && orders.map((order) => (
          <li key={order._id} className={styles['order-card']} onClick={() => history.push(`${pathname}/${order._id}`, { background: location })}>
            <div className={`${styles['order-card-row']} mb-6`}>
              <p className='text text_type_digits-default'>{`#${order.number}`}</p>
              <p className='text text_type_main-default text_color_inactive'>{getTimeStamp(order.createdAt)}</p>
            </div>
            <p className='text text_type_main-medium mb-6'>{order.name}</p>
            <div className={styles['order-card-row']}>
              <ul className={`${styles.list} ${styles['ingredients-list']}`}>
                {imagesToShow(order).map((image, index) => (
                  <li key={index} className={styles['ingredients-list-item']} style={{zIndex: 6 - index, left: `-${index * 16}px`}}>
                    <IngredientIcon image={image} />
                    {index === 5 && more(order) > 0 && (
                      <div className={styles.more}>
                        <span className='text text_type_main-small'>
                          {`+${more(order)}`}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              <div className={styles.price}>
                <p className='text text_type_digits-default mr-2'>{getPrice(order, ingredients)}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersList;
