import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientPropType } from '../../utils/propTypes';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('BUN');
  const ingredientCategories = [
    {
      "id":"1",
      "title":"Булки",
      "ingredients": ingredients.filter(item => item.type === "bun")
    },
    {
      "id":"2",
      "title":"Соусы",
      "ingredients": ingredients.filter(item => item.type === "sauce")
    },
    {
      "id":"3",
      "title":"Начинки",
      "ingredients": ingredients.filter(item => item.type === "main")
    },
  ]

  return (
    <section className={styles['ingredients-container']}>
      <div className={`${styles.tabs} mb-5`}>
        <Tab value="BUN" active={current === 'BUN'} onClick={setCurrent}>Булки</Tab>
        <Tab value="SAUCE" active={current === 'SAUCE'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="MAIN" active={current === 'MAIN'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <ul className={`${styles['categories-list']}`}>
        {ingredientCategories.map((category) => (
          <IngredientsCategory title={category.title} ingredients={category.ingredients} key={category.id} />
        ))}
      </ul>

    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

