import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/propTypes';
import styles from './ingredients-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

const IngredientsCategory = React.forwardRef(({ title, ingredients }, ref) => {
  const burgerConstructor = useSelector(store => store.burgerConstructor);

  const ingredientsCounters = useMemo(() => {
    const { bun, toppings } = burgerConstructor;
    const counters = {};
    toppings.forEach((topping) => {
      if (!counters[topping._id]) counters[topping._id] = 0;
      counters[topping._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <li>
      <h2 className='text text_type_main-medium mb-6' ref={ref}>{title}</h2>
      <ul className={`${styles['ingredients-list']} ml-4 mr-4 mb-10`}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient ingredient={ingredient} key={ingredient._id} counter={ingredientsCounters[ingredient._id]} />
        ))}
      </ul>
    </li>
  );
});

export default React.memo(IngredientsCategory);

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};
