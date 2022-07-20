import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorTopping from '../burger-constructor-topping/burger-constructor-topping';
import { sendOrder } from '../../services/actions/order-details-action';
import { addIngredient } from '../../services/actions/burger-constructor-actions';

function BurgerConstructor() {
  const { bun, toppings } = useSelector(store => store.burgerConstructor);
  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const totalPrice = useMemo(
    () => {
      const bunsPrice = bun ? bun.price * 2 : 0;
      return toppings ? toppings.reduce((acc, current) => acc + current.price, bunsPrice) : bunsPrice;
    }, [bun, toppings]
  )

  // const handleOrderButtonClick = () => {
  //   // const bunId = bun ? [bun._id] : [];
  //   // const toppingsIds = toppings.length ? toppings.map(i => i._id) : [];
  //   // const ids = [...bunId, ...toppingsIds];
  //   const ids = bun && toppings.length ? [bun._id, ...toppings.map(i => i._id)] : [];
  //   dispatch(sendOrder(ids));
  // }

  const handleOrderButtonClick = () => {
    if(user) {
      const ids = bun && toppings.length ? [bun._id, ...toppings.map(i => i._id)] : [];
    dispatch(sendOrder(ids));
    } else {
      history.push('/login');
    }
  };

  const [{isHover}, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  return (
    <section className={`${styles['constructor-container']} pl-4 ${isHover ? styles['on-hover'] : ''}`} ref={dropTargetRef}>
      {(bun || toppings.length) ? (
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
            {toppings && toppings.map((ingredient, index) => (
              <BurgerConstructorTopping ingredient={ingredient} key={ingredient.key} index={index} />
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
        ) : (
        <div className={`${styles['instruction-container']} mb-10`}>
          <p className={`text text_type_main-medium mb-6`}>Перетащите ингредиенты из списка слева</p>
        </div>
        )
      }

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
