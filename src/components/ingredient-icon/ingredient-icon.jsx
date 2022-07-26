import styles from './ingredient-icon.module.css';

function IngredientIcon({image}) {

  return (
    <div  className={styles['ingredient-icon']}>
      <div className={styles['ingredient-icon-border']} />
        <div
          style={{backgroundImage: `url('${image}')`}}
          className={styles['ingredient-icon-image']}
        />
    </div>
  )
};

export default IngredientIcon;



