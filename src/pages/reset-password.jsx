import { useState } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forms.module.css';
import Preloader from '../components/preloader/preloader';
import { changePassword } from '../utils/api';

const ResetPasswordPage = () => {
  const location = useLocation();

  const [data, setData] = useState({
    password: '',
    token: '',
  });

  const [state, setState] = useState({
    isRequest: false,
    isSuccess: false
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setState({...state, isRequest: true});
    changePassword(data)
      .then((res) => {
        setState({...state, isRequest: false, isSuccess: true});
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setState({...state, isRequest: false});
      })
  };

  const { from } = location.state || { from: { pathname: '/' } };

  if (from.pathname !== '/forgot-password') {
    return (
      <Redirect
        to={from}
      />
    )
  };

  return (
    <>
      {state.isRequest && <Preloader />}

      {state.isSuccess ? (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: '/reset-password' }
          }}
        />
        ) : (
        <div className={styles.container}>
          <h1 className='mb-6 text text_type_main-medium'>Восстановление пароля</h1>
          <form className={`mb-20 ${styles.form}`} onSubmit={onSubmit}>
            <div className={`mb-6 ${styles.input}`}>
              <PasswordInput
                onChange={onChange}
                value={data.password}
                name={'password'}
              />
            </div>
            <div className={`mb-6 ${styles.input}`}>
              <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onChange}
                value={data.token}
                error={false}
                errorText={'Ошибка'}
                name={'token'}
                size={'default'}
              />
            </div>
            <Button type='primary' size='medium'>
              Сохранить
            </Button>
          </form>
          <p className='mb-4 text text_type_main-default text_color_inactive'>
            Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
          </p>
        </div>
      )}
    </>

  );
}

export default ResetPasswordPage;
