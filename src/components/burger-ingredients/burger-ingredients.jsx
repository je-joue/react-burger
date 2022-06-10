import React, { useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { ingredientPropType } from '../../utils/propTypes';

function BurgerIngredients({ onCardClick }) {
  const ingredients = useSelector(store => store.burgerData.ingredients);

  const [currentTab, setCurrentTab] = React.useState('bun');

  const categoriesListRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const saucesTitleRef = useRef(null);
  const mainTitleRef = useRef(null);

  // OLD
  // const handleScroll = () => {
  //   const currentScroll = categoriesListRef.current.scrollTop  + categoriesListRef.current.offsetTop;
  //   const bunsTitlePos = bunsTitleRef.current.offsetTop;
  //   const saucesTitlePos = saucesTitleRef.current.offsetTop;
  //   const mainTitlePos = mainTitleRef.current.offsetTop;

  //   if (currentScroll >= bunsTitlePos && currentScroll < saucesTitlePos) setCurrentTab('bun');
  //   if (currentScroll >= saucesTitlePos && currentScroll < mainTitlePos) setCurrentTab('sauce');
  //   if (currentScroll >= mainTitlePos) setCurrentTab('main');
  // }

  const handleScroll = () => {
    const categoriesListPos = categoriesListRef.current.offsetTop;
    const currentScroll = categoriesListRef.current.scrollTop;
    const bunsTitlePos = Math.abs(bunsTitleRef.current.offsetTop - currentScroll - categoriesListPos);
    const saucesTitlePos = Math.abs(saucesTitleRef.current.offsetTop - currentScroll - categoriesListPos);
    const mainTitlePos = Math.abs(mainTitleRef.current.offsetTop - currentScroll - categoriesListPos);

    if (bunsTitlePos < saucesTitlePos) setCurrentTab('bun');
    if (saucesTitlePos < bunsTitlePos) setCurrentTab('sauce');
    if (mainTitlePos < saucesTitlePos) setCurrentTab('main');
  }

  function onTabClickScroll(el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const handleTabClick = (el) => {
    setCurrentTab(el);
    if (el === 'bun') onTabClickScroll(bunsTitleRef.current);
    if (el === 'sauce') onTabClickScroll(saucesTitleRef.current);
    if (el === 'main') onTabClickScroll(mainTitleRef.current);
  }

  const ingredientCategories = useMemo(
    () =>
    [
      {
        'id': '1',
        'type': 'bun',
        'title': 'Булки',
        'ref': bunsTitleRef,
        'ingredients': ingredients.filter(item => item.type === 'bun')
      },
      {
        'id': '2',
        'type': 'sauce',
        'title': 'Соусы',
        'ref': saucesTitleRef,
        'ingredients': ingredients.filter(item => item.type === 'sauce')
      },
      {
        'id': '3',
        "type": 'main',
        'title': 'Начинки',
        'ref': mainTitleRef,
        'ingredients': ingredients.filter(item => item.type === 'main')
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

// BurgerIngredients.propTypes = {
//   onCardClick: PropTypes.func.isRequired
// };

