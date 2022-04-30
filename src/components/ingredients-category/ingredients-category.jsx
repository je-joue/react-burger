import styles from './ingredients-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

function IngredientsCategory({ title, ingredients }) {
  return (
    <li>
      <h2 className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={`${styles['ingredients-list']} ml-4 mr-4 mb-10`}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient ingredient={ingredient} key={ingredient._id} />
        ))}
      </ul>
      
    </li>
  );
}

export default IngredientsCategory;
