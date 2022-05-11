import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {apiConfig} from '../../constants/api-config';

function App() {
  // states
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // getCards() {
  //   return fetch(`${this.baseURL}/cards`, {
  //     headers: this.headers
  //   })
  //   .then(res => this._checkResponse(res));
  // }

  // Promise.all([api.getUserData(), api.getCards()])
  // .then(([userData, cards]) => {
  //   userId = userData._id;
  //   userInfo.setUserInfo(userData);
  //   userInfo.setAvatar(userData);
  //   cardsList.renderItems(cards);
  // })
  // .catch(err => console.log(err))

  const getIngredients = () => {
    fetch(`${apiConfig.baseURL}ingredients`, {
      headers: apiConfig.headers
    })
    .then(res => checkResponse(res))
    .then(res => setIngredients(res.data))
    .catch(err => console.log(err));
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={styles['main-columns']}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>
    </div>
  );
}

export default App;
