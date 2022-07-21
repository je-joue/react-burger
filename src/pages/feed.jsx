import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsConfig } from '../constants/ws-config';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/ws-actions';

import styles from './feed.module.css';

// import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
// import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Preloader from '../components/preloader/preloader';

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
            {/* <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor /> */}
            <div>rgssdgd</div>
            <div>gdfgf</div>
          </div>
        </>
      )}
    </>
  )
}

export default FeedPage;
