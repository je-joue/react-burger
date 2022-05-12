import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientPropType } from '../../utils/propTypes';

function BurgerIngredients({ ingredients, onCardClick }) {
  const [currentTab, setCurrentTab] = React.useState('buns');

  const categoriesListRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const saucesTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  // const handleScroll = () => {
  //   const currentScroll = categoriesListRef.current.scrollTop;
  //   const bunsTitlePos = Math.abs(bunsTitleRef.current.offsetTop - currentScroll);
  //   const saucesTitlePos = Math.abs(saucesTitleRef.current.offsetTop - currentScroll);
  //   const mainTitlePos = Math.abs(mainTitleRef.current.offsetTop - currentScroll);

  //   if (bunsTitlePos < saucesTitlePos) setCurrentTab('buns');
  //   if (saucesTitlePos < bunsTitlePos && saucesTitlePos < mainTitlePos) setCurrentTab('sauces');
  //   if (mainTitlePos < saucesTitlePos) setCurrentTab('main');
  // }

  function handleTabClick(el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const ingredientCategories = [
    {
      "id": "1",
      "title": "Булки",
      "ref": bunsTitleRef,
      "ingredients": ingredients.filter(item => item.type === "bun")
    },
    {
      "id": "2",
      "title": "Соусы",
      "ref": saucesTitleRef,
      "ingredients": ingredients.filter(item => item.type === "sauce")
    },
    {
      "id": "3",
      "title": "Начинки",
      "ref": mainTitleRef,
      "ingredients": ingredients.filter(item => item.type === "main")
    },
  ]

  return (
    <section className={styles['ingredients-container']}>
      <div className={`${styles.tabs} mb-5`}>
        <Tab value="buns" active={currentTab === 'buns'}
            onClick={(value) => {
              setCurrentTab(value);
              handleTabClick(bunsTitleRef.current);
            }}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'}
            onClick={(value) => {
              setCurrentTab(value);
              handleTabClick(saucesTitleRef.current);
            }}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'}
            onClick={(value) => {
              setCurrentTab(value);
              handleTabClick(mainTitleRef.current);
            }}>
          Начинки
        </Tab>
      </div>

      <ul className={`${styles['categories-list']}`} ref={categoriesListRef}>
        {ingredientCategories.map((category) => (
          <IngredientsCategory title={category.title} ingredients={category.ingredients} key={category.id} ref={category.ref} onCardClick={onCardClick} />
        ))}
      </ul>

    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

