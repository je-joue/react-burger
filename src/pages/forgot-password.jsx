import { useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import Preloader from "../components/preloader/preloader";
import { resetPassword } from "../utils/api";


const ForgotPasswordPage = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: ''
  });

  const [state, setState] = useState({
    isRequest: false,
    isSuccess: false
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setState({...state, isRequest: true});
    resetPassword(data)
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

  return (
    <>
      {state.isRequest && <Preloader />}

      {state.isSuccess ? (
        <Redirect
          to={{
            pathname: '/reset-password',
            state: { from: history.location.pathname },
          }}
        />
      ) : (
        <div className={styles.container}>
          <h1 className='mb-6 text text_type_main-medium'>
            Восстановление пароля
          </h1>
          <form className={`mb-20 ${styles.form}`} onSubmit={onSubmit}>
            <div className={`mb-6 ${styles.input}`}>
              <Input
                type={'text'}
                placeholder={'Укажите email'}
                onChange={onChange}
                value={data.email}
                error={false}
                errorText={'Ошибка'}
                name={'email'}
                size={'default'}
              />
            </div>
            <Button type='primary' size='medium'>
              Восстановить
            </Button>
          </form>
          <p className='mb-4 text text_type_main-default text_color_inactive'>
            Вспомнили пароль?{' '}
            <Link to='/login' className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
