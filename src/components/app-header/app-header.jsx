import styles from './app-header.module.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const {pathname} = useLocation();
  return (
    <header className={styles.header}>
      <nav className={styles.header__menu}>
        <div className={styles['header__menu-wrapper']}>
          <NavLink className={`${styles['header__menu-item']} mt-4 mr-7 mb-4 ml-5 text text_type_main-default`} activeClassName={`${styles['header__menu-item_active']}`} to='/' exact={true}>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <span className='ml-2'>Конструктор</span>
          </NavLink>


          <NavLink className={`${styles['header__menu-item']} mt-4 mr-7 mb-4 ml-5 text text_type_main-default`} activeClassName={`${styles['header__menu-item_active']}`} to='/feed'>
            <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
            <span className='ml-2'>Лента заказов</span>
          </NavLink>
        </div>
        <Link className={styles['header__menu-item']} to='/'><Logo /></Link>
        <NavLink className={`${styles['header__menu-item']} mt-4 mr-7 mb-4 ml-5 text text_type_main-default`} activeClassName={`${styles['header__menu-item_active']}`} to='/profile'>
          <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
          <span className='ml-2'>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
