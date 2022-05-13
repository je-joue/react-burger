import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropType } from '../../utils/propTypes';

const IngredientDetails = ({ currentIngredient}) => {
  console.log(currentIngredient);
  return (
    <div className={`${styles['ingredient-details-container']} pr-15 pb-15 pl-15`}>
      <img className='mb-4' src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className='text text_type_main-medium mb-8'>{currentIngredient.name}</p>
      <ul className={styles['nutrition-values-list']}>
        <li className={styles['nutrition-values-item']}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <span className='text text_type_digits-medium text_color_inactive'>{currentIngredient.calories}</span>
        </li>
        <li className={styles['nutrition-values-item']}>
          <p className='text text_type_main-default text_color_inactive mb-2'>КБелки, г</p>
          <span className='text text_type_digits-medium text_color_inactive'>{currentIngredient.proteins}</span>
        </li>
        <li className={styles['nutrition-values-item']}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <span className='text text_type_digits-medium text_color_inactive'>{currentIngredient.fat}</span>
        </li>
        <li className={styles['nutrition-values-item']}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <span className='text text_type_digits-medium text_color_inactive'>{currentIngredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  currentIngredient: ingredientPropType.isRequired,
}
