import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../services/actions/auth-actions";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./forms.module.css";

const RegistrationPage = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  };

  return (
    <div className={styles.container}>
      <h1 className='mb-6 text text_type_main-medium'>Регистрация</h1>
      <form onSubmit={handleSubmit} className={`mb-20 ${styles.form}`}>
        <div className={`mb-6 ${styles.input}`}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={userData.name}
            error={false}
            errorText={'Ошибка'}
            name={'name'}
          />
        </div>
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
          Зарегистрироваться
        </Button>
      </form>
      <p className='mb-4 text text_type_main-default text_color_inactive'>
        Уже зарегистрировались?{' '}
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
