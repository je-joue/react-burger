import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientPropType } from '../../utils/propTypes';

function BurgerIngredients({ ingredients, onCardClick }) {
  const [currentTab, setCurrentTab] = React.useState('bun');

  const categoriesListRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const saucesTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  const handleScroll = () => {
    const currentScroll = categoriesListRef.current.scrollTop + categoriesListRef.current.offsetTop;
    const bunsTitlePos = bunsTitleRef.current.offsetTop;
    const saucesTitlePos = saucesTitleRef.current.offsetTop;
    const mainTitlePos = mainTitleRef.current.offsetTop;

    if (currentScroll >= bunsTitlePos && currentScroll < saucesTitlePos) setCurrentTab('bun');
    if (currentScroll >= saucesTitlePos && currentScroll < mainTitlePos) setCurrentTab('sauce');
    if (currentScroll >= mainTitlePos) setCurrentTab('main');
  }

  function onTabClickScroll(el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleTabClick = (e) => {
    setCurrentTab(e);
    if (e === "bun") onTabClickScroll(bunsTitleRef.current);
    if (e === "sauce") onTabClickScroll(saucesTitleRef.current);
    if (e === "main") onTabClickScroll(mainTitleRef.current);
  }

  const ingredientCategories = React.useMemo(
    () =>
    [
      {
        "id": "1",
        "type": "bun",
        "title": "Булки",
        "ref": bunsTitleRef,
        "ingredients": ingredients.filter(item => item.type === "bun")
      },
      {
        "id": "2",
        "type": "sauce",
        "title": "Соусы",
        "ref": saucesTitleRef,
        "ingredients": ingredients.filter(item => item.type === "sauce")
      },
      {
        "id": "3",
        "type": "main",
        "title": "Начинки",
        "ref": mainTitleRef,
        "ingredients": ingredients.filter(item => item.type === "main")
      },
    ],
    [ingredients]
  );

  return (
    <section className={styles['ingredients-container']}>
      <div className={`${styles.tabs} mb-5`}>
        {ingredientCategories.map((category) => (
          <Tab value={category.type} active={currentTab === category.type}
            key={category.id}
            onClick={handleTabClick}>
            {category.title}
          </Tab>
        ))}
      </div>

      <ul className={`${styles['categories-list']}`} ref={categoriesListRef} onScroll={handleScroll}>
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
  onCardClick: PropTypes.func.isRequired
};

