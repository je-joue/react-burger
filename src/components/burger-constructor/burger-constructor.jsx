import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/propTypes';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

function BurgerConstructor({ onOrderButtonClick }) {
  const { constructorState, constructorDispatcher } = useContext(BurgerConstructorContext);
  const bunsPrice = constructorState.bun ? constructorState.bun.price * 2 : 0;
  const totalPrice = constructorState.fillings ? constructorState.fillings.reduce((acc, current) => acc + current.price, bunsPrice) : bunsPrice;

  return (
    <section className={`${styles['constructor-container']} pl-4`}>
      <div className={`${styles.constructor} mb-10`}>
        {constructorState.bun && <div className='mr-4 mb-4 ml-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={constructorState.bun.name}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
          />
        </div>}

        <ul className={styles.list}>
          {constructorState.fillings && constructorState.fillings.map((ingredient) => (
            <li className={`${styles['element-wrapper']} mr-2 mb-4`} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>

        {constructorState.bun && <div className='mt-4 mr-4 ml-8'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={constructorState.bun.name}
            price={constructorState.bun.price}
            thumbnail={constructorState.bun.image}
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
        <Button type="primary" size="large" onClick={onOrderButtonClick}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOrderButtonClick: PropTypes.func.isRequired
};

export default BurgerConstructor;
