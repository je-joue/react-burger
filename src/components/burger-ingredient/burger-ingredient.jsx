import styles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredient({ ingredient }) {
  return (
    <li className={`${styles['ingredient-card']} pr-4 pl-4`}>
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles['ingredient-price']} mt-2 mb-2`}>
        <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles['ingredient-title']} text text_type_main-default`}>{ingredient.name}</p>
      <Counter className={styles['ingredient-counter']} count={1} size="default" />
    </li>
  );
}

export default BurgerIngredient;