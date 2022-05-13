import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredients } from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientInfoOpened, setIngredientInfoOpened] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState([]);

  useEffect(() => {
    getIngredients()
    .then(res => setIngredients(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleOrderButtonClick = () => {
    setIsOrderDetailsOpened(true);
  }

  const handleIngredientClick = (ingredient) => {
    setIngredientInfoOpened(true);
    setCurrentIngredient(ingredient);
  }

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIngredientInfoOpened(false);
  };

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={styles['main-columns']}>
          <BurgerIngredients ingredients={ingredients} onCardClick={handleIngredientClick} />
          <BurgerConstructor ingredients={ingredients} onOrderButtonClick={handleOrderButtonClick} />
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
    </div>
  );
}

export default App;
