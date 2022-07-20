import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/propTypes';
import { getIngredients } from '../../services/actions/burger-data-actions';
import { addIngredient } from '../../services/actions/burger-constructor-actions';

function IngredientDetails({title}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();

  const { ingredients } = useSelector(store => store.burgerData);
  const [ currentIngredient, setCurrentIngredient ] = useState(null);

  const handleAddIngredientClick = useCallback(
    () => {
      dispatch(addIngredient(currentIngredient));
    },
    [dispatch]
  );

  useEffect(() => {
    if(!ingredients.length && !location.state) {
      dispatch(getIngredients());
    }
  }, []);

  useEffect(() => {
    if(ingredients.length !== 0) {
      const current = ingredients.find(
        (ingredient) => ingredient._id === id
      );
      setCurrentIngredient(current ? current : null);
    }
  }, [ingredients, id]);

  console.log(currentIngredient);

  return (
    <>
      {currentIngredient && (
        <div className={`${styles['ingredient-details-container']} pr-15 pb-15 pl-15`}>
          {title && <h3 className="mt-30 text text_type_main-large">{title}</h3>}
          <img className='mb-4' src={currentIngredient.image_large} alt={currentIngredient.name} />
          <p className='text text_type_main-medium mb-8'>{currentIngredient.name}</p>
          <ul className={styles['nutrition-values-list']}>
            <li className={styles['nutrition-values-item']}>
              <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
              <span className='text text_type_digits-medium text_color_inactive'>{currentIngredient.calories}</span>
            </li>
            <li className={styles['nutrition-values-item']}>
              <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
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
          <div className='mt-8'>
            <Button type="primary" size="large" onClick={handleAddIngredientClick}>Добавить в заказ</Button>
          </div>
        </div>
      )}
    </>
  )
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  title: PropTypes.string
}


