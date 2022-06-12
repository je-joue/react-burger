import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './burger-constructor-topping.module.css';
import { ingredientPropType } from '../../utils/propTypes';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, reoderIngredients } from '../../services/actions/burger-constructor-actions';
import { decreaseCount } from '../../services/actions/burger-data-actions';
import { reorderIngredients } from '../../services/actions/burger-constructor-actions';

function BurgerConstructorTopping({ ingredient, index }) {
  const dispatch = useDispatch();

  const handleDeleteIngredientClick = (key, id) => {
    dispatch(deleteIngredient(key));
    dispatch(decreaseCount(id));
  }

  const ref = useRef(null);
  const id = ingredient.key;

  const [{ handlerId }, drop] = useDrop({
    accept: 'topping',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(reorderIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'topping',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li className={`${styles['element-wrapper']} mr-2 mb-4`} draggable ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDeleteIngredientClick(ingredient.key, ingredient._id)}
      />
    </li>
  )
}

BurgerConstructorTopping.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired
}

export default BurgerConstructorTopping;

