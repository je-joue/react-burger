import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './main.module.css';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Preloader from '../components/preloader/preloader';

function MainPage() {
  const { ingredients, ingredientsRequest } = useSelector(store => store.burgerData);

  return (
    <>
      {ingredientsRequest ? (
        <Preloader />
      ) : (
        <DndProvider backend={HTML5Backend}>
          <>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={styles['main-columns']}>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor />
            </div>
          </>
        </DndProvider>
      )}
    </>
  )
}

export default MainPage;

