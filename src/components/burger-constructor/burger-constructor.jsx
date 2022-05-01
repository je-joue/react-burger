import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({ ingredients }) {
  return (
    <section className={`${styles['constructor-container']} pl-4`}>
      <div className={`${styles.constructor} mb-10`}>
        <div className='mr-4 mb-4 ml-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>

        <ul className={styles.list}>
          {ingredients.filter(ingredient => ingredient.type !== "bun").map((ingredient) => (
            <li className={`${styles['element-wrapper']} mr-2 mb-4`} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                key={ingredient._id} 
              />
            </li>
          ))}
        </ul>

        <div className='mt-4 mr-4 ml-8'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        
      </div>
      <div className={`${styles.order} mr-4`}>
        <div className={`${styles['price-total']} mr-10`}>
          <span className='text text_type_digits-medium mr-2'>610</span>
          <div className={styles['currency-icon']}>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
      {/* <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      />

      <ul>
        {ingredients.filter(ingredient => ingredient.type !== "bun").map((ingredient) => 
          <li className={styles[] key={ingredient._id}}>
            <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
          </li>



        )}
      </ul>


      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
      /> */}
    </section>
  );
}

export default BurgerConstructor;