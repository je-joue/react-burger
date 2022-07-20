import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Preloader from '../components/preloader/preloader';
import { loginUser } from '../services/actions/auth-actions';

import styles from './forms.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isRequest } = useSelector(store => store.auth);
  const { user } = useSelector(store => store.auth);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const { from } = location.state || { from: { pathname: '/' } };

  if (user) {
    return (
      <Redirect
        to={from}
      />
    )
  };

  return (
    <>
      {isRequest && <Preloader />}

      <div className={styles.container}>
        <h1 className="mb-6 text text_type_main-medium">Вход</h1>
        <form onSubmit={handleSubmit} className={`mb-20 ${styles.form}`}>
          <div className={`mb-6 ${styles.input}`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleChange}
              value={userData.email}
              error={false}
              errorText={'Ошибка'}
              name={'email'}
            />
          </div>
          <div className={`mb-6 ${styles.input}`}>
            <PasswordInput
              onChange={handleChange}
              value={userData.password}
              name={'password'}
            />
          </div>
          <Button type='primary' size='medium'>
            Войти
          </Button>
        </form>
        <p className='mb-4 text text_type_main-default text_color_inactive'>
          Вы — новый пользователь?{' '}
          <Link to='/register' className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{' '}
          <Link to='/forgot-password' className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>

  );
};

export default LoginPage;
