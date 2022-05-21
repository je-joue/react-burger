import React, { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { fetchIngredients, putOrder } from '../../utils/api';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false);
  const [isIngredientInfoOpened, setIngredientInfoOpened] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState([]);

  const constructorInitialState = {
    bun: null,
    fillings: [],
    ids: [],
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

      case 'setFillings':
        return {
          ...state,
          fillings: [...state.fillings, payload],
          ids: [...state.ids, payload._id]
        }

      case 'getOrderNumber':
        return {
          ...state,
          orderNumber: payload
        }
    }
  };

  const [constructorState, constructorDispatcher] = useReducer(constructorReducer, constructorInitialState, undefined);

  useEffect(() => {
    fetchIngredients()
    .then(res => setIngredients(res.data))
    .catch(err => console.log(err));
  }, []);

  const addIngredientOnClick = (ingredient) => {
    ingredient.type === 'bun' ? constructorDispatcher({ type: 'setBun', payload: ingredient }) : constructorDispatcher({ type: 'setFillings', payload: ingredient });
  }

  const handleIngredientClick = (ingredient) => {
    setIngredientInfoOpened(true);
    setCurrentIngredient(ingredient);
    addIngredientOnClick(ingredient);
  }

  const handleOrderButtonClick = () => {
    putOrder(constructorState.ids)
    .then(res => constructorDispatcher({ type: 'getOrderNumber', payload: res.order.number }))
    .then(setOrderDetailsOpened(true))
    .catch(err => console.log(err));
  }

  const closeAllModals = () => {
    setOrderDetailsOpened(false);
    setIngredientInfoOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <BurgerConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
        <main className={`${styles.main} pl-5 pr-5`}>
          <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
          <div className={styles['main-columns']}>
            <BurgerIngredients ingredients={ingredients} onCardClick={handleIngredientClick} />
            <BurgerConstructor onOrderButtonClick={handleOrderButtonClick} />
          </div>
        </main>

        {isOrderDetailsOpened &&
          <Modal
            onCloseButtonClick={closeAllModals}
            onEscKeydown={handleEscKeydown}
          >
            <OrderDetails />
          </Modal>
        }

        {isIngredientInfoOpened &&
          <Modal
            title="Детали ингредиента"
            onCloseButtonClick={closeAllModals}
            onEscKeydown={handleEscKeydown}
          >
            <IngredientDetails currentIngredient={currentIngredient} />
          </Modal>
        }
      </BurgerConstructorContext.Provider>


    </div>
  );
}

export default App;
