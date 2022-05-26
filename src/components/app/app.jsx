import React, { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { fetchIngredients, sendOrder } from '../../utils/api';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';
import Preloader from '../preloader/preloader';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [isIngredientInfoOpened, setIngredientInfoOpened] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState([]);
  const [isIngredientsLoading, setIngredientsLoadig] = useState(true);

  const constructorInitialState = {
    bun: null,
    toppings: [],
    ids: [],
    isOrderNumberLoading: false,
    orderError: null,
    orderNumber: null
  };

  function constructorReducer(state, { type, payload }) {
    switch (type) {
      case 'setBun':
        return {
          ...state,
          bun: payload,
          ids: [...state.ids, payload._id]
        }
      case 'setToppings':
        return {
          ...state,
          toppings: [...state.toppings, payload],
          ids: [...state.ids, payload._id]
        }
      case 'setOrderNumber':
        return {
          ...state,
          isOrderNumberLoading: false,
          orderNumber: payload
        }
      case 'setOrderNumberLoading':
        return {
          ...state,
          isOrderNumberLoading: true
        }
      case 'setError':
        return {
          ...state,
          isOrderNumberLoading: false,
          orderError: payload
        }
      case 'resetOrder':
        return {
          ...state,
          isOrderNumberLoading: false,
          orderError: null,
          orderNumber: null
        }
    }
  };

  const [constructorState, constructorDispatcher] = useReducer(constructorReducer, constructorInitialState, undefined);

  useEffect(() => {
    fetchIngredients()
    .then(res => setIngredients(res.data))
    .catch(err => alert('Ошибка при загрузке данных'))
    .finally(() => setIngredientsLoadig(false));
  }, []);

  const addIngredientOnClick = (ingredient) => {
    ingredient.type === 'bun' ? constructorDispatcher({ type: 'setBun', payload: ingredient }) : constructorDispatcher({ type: 'setToppings', payload: ingredient });
  }

  const handleIngredientClick = React.useCallback(
    (ingredient) => {
      setIngredientInfoOpened(true);
      setCurrentIngredient(ingredient);
      addIngredientOnClick(ingredient);
    },
    []
  );

  const handleOrderButtonClick = () => {
    sendOrder(constructorState.ids)
    .then(setOrderDetailsOpened(true))
    .then(constructorDispatcher({ type: 'setOrderNumberLoading' }))
    .then(res => constructorDispatcher({ type: 'setOrderNumber', payload: res.order.number }))
    .catch(err => constructorDispatcher({ type: 'setError', payload: 'Что-то пошло не так...' }));
  }

  const closeAllModals = () => {
    setOrderDetailsOpened(false);
    setIngredientInfoOpened(false);
    constructorDispatcher({ type: 'resetOrder' })
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <BurgerConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
          <main className={`${styles.main} pl-5 pr-5`}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={styles['main-columns']}>
              <BurgerIngredients ingredients={ingredients} onCardClick={handleIngredientClick} />
              <BurgerConstructor onOrderButtonClick={handleOrderButtonClick} />
            </div>
          </main>

          {isOrderDetailsOpened &&
            <Modal closeModal={closeAllModals}>
              <OrderDetails />
            </Modal>
          }

          {isIngredientInfoOpened &&
            <Modal
              title="Детали ингредиента"
              closeModal={closeAllModals}
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          }
        </BurgerConstructorContext.Provider>
      )}
    </div>
  );
}

export default App;
