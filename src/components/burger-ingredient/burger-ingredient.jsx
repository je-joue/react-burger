import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import styles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/propTypes';
import { setIngredientDetails } from '../../services/actions/ingredient-details-actions';

function BurgerIngredient({ ingredient, counter }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  }, [ingredient]);

  const handleIngredientClick = useCallback(
    () => {
      dispatch(setIngredientDetails(ingredient));
    },
    [dispatch]
  );
  return (
    <li className={`${styles['ingredient-card']} pr-4 pl-4`} onClick={handleIngredientClick} ref={dragRef}>
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles['ingredient-price']} mt-2 mb-2`}>
        <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles['ingredient-title']} text text_type_main-default`}>{ingredient.name}</p>
      <Counter className={styles['ingredient-counter']} count={counter} size="default" />
    </li>
  );
}

export default React.memo(BurgerIngredient);

BurgerIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
}
