import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/actions/burger-constructor-actions';
import { sendOrder } from '../../services/actions/order-details-action';

function BurgerConstructor() {
  const { bun, toppings } = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();

  const totalPrice = useMemo(
    () => {
      const bunsPrice = bun ? bun.price * 2 : 0;
      return toppings ? toppings.reduce((acc, current) => acc + current.price, bunsPrice) : bunsPrice;
    }, [bun, toppings]
  )

  const handleOrderButtonClick = () => {
    const bunId = bun ? [bun._id] : [];
    const toppingsIds = toppings.length ? toppings.map(i => i._id) : [];
    const ids = [...bunId, ...toppingsIds];
    // const ids = bun && toppings.length ? [bun._id, ...toppings.map(i => i._id)] : [];
    dispatch(sendOrder(ids));
  }

  const handleDeleteIngredientClick = (key) => {
    dispatch(deleteIngredient(key));
  }

  return (
    <section className={`${styles['constructor-container']} pl-4`}>
      <div className={`${styles.constructor} mb-10`}>
        {bun && <div className='mr-4 mb-4 ml-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>}

        <ul className={styles.list}>
          {toppings && toppings.map((ingredient) => (
            <li className={`${styles['element-wrapper']} mr-2 mb-4`} key={ingredient.key}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleDeleteIngredientClick(ingredient.key)}
              />
            </li>
          ))}
        </ul>

        {bun && <div className='mt-4 mr-4 ml-8'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>}

      </div>
      <div className={`${styles.order} mr-4`}>
        <div className={`${styles['price-total']} mr-10`}>
          <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
          <div className={styles['currency-icon']}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button type="primary" size="large" onClick={handleOrderButtonClick}>Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
