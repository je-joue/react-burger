import { useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./profile-menu.module.css";

import { logoutUser } from "../../services/actions/auth-actions";

const ProfileMenu = ({ description }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.replace({ pathname: '/login' });
  };

  return (
    <div className={`mr-15 ${styles.menu}`}>
      <ul className={styles.list}>
        <li className={styles['list-item']}>
          <NavLink
            to='/profile'
            exact
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles.active}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles['list-item']}>
          <NavLink
            to="/profile/orders"
            exact
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles.active}
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles['list-item']}>
          <Link
            to='/logout'
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            onClick={handleLogoutClick}
          >
            Выход
          </Link>
        </li>
      </ul>
      <p className='text text_type_main-default text_color_inactive'>
        {description}
      </p>
    </div>
  );
};

ProfileMenu.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ProfileMenu;
