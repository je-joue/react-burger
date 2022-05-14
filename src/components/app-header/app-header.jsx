import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__menu}>
        <div className={styles['header__menu-wrapper']}>
          <a className={`${styles['header__menu-item']} mt-4 mr-7 mb-4 ml-5`} href="#">
            <BurgerIcon />
            <span className='text text_type_main-default ml-2'>Конструктор</span>
          </a>
          <a className={`${styles['header__menu-item']} mt-4 mr-5 mb-4 ml-5`} href="#">
            <ListIcon type="secondary"/>
            <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
          </a>
        </div>
        <a className={styles['header__menu-item']} href="#"><Logo /></a>
        <a className={`${styles['header__menu-item']} mt-4 mr-5 mb-4 ml-5`} href="#">
          <ProfileIcon type="secondary" />
          <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
        </a>
      </nav> 
    </header>
  );
}

export default AppHeader;