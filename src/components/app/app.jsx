import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Preloader from '../preloader/preloader';
import { getIngredients } from '../../services/actions/burger-data-actions';
import { closeIngredientDetails } from '../../services/actions/ingredient-details-actions';
import { resetConstructor } from '../../services/actions/burger-constructor-actions';
import { closeOrderDetails } from '../../services/actions/order-details-action';
import { resetCount } from '../../services/actions/burger-data-actions';

function App() {
  const { ingredients, ingredientsRequest } = useSelector(store => store.burgerData);
  const { currentIngredient, isIngredientDetailsOpen } = useSelector(store => store.ingredientDetails);
  const { isOrderDetailsOpen, order } = useSelector(store => store.orderDetails);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const closeIngredientDetailsModal = () => {
    dispatch(closeIngredientDetails());
  };

  const closeOrderDetailsModal = () => {
    dispatch(closeOrderDetails());
    if (order) {
      dispatch(resetConstructor());
      dispatch(resetCount());
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredientsRequest ? (
        <Preloader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <main className={`${styles.main} pl-5 pr-5`}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={styles['main-columns']}>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor />
            </div>
          </main>
        </DndProvider>
      )}

          {isOrderDetailsOpen &&
            <Modal closeModal={closeOrderDetailsModal}>
              <OrderDetails />
            </Modal>
          }

          {isIngredientDetailsOpen &&
            <Modal
              title="Детали ингредиента"
              closeModal={closeIngredientDetailsModal}
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          }

    </div>
  );
}

export default App;
