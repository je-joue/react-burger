import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';

function BurgerIngredients({ ingredients, ingredientCategories }) {
  const [current, setCurrent] = React.useState('BUN');

  return (
    <section>
      <div className={`${styles.tabs} mb-5`}>
        <Tab value="BUN" active={current === 'BUN'} onClick={setCurrent}>Булки</Tab>
        <Tab value="SAUCE" active={current === 'SAUCE'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="MAIN" active={current === 'MAIN'} onClick={setCurrent}>Начинки</Tab>
      </div>
      <ul className={`${styles['categories-list']} pl-4`}>
        {ingredientCategories.map((category) => (
          <IngredientsCategory title={category.title} ingredients={category.ingredients} key={category.id} />
        ))}
      </ul>

    </section>
  );
}

export default BurgerIngredients;