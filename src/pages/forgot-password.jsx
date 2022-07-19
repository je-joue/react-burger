import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Link, useHistory, useLocation } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forms.module.css";
import Preloader from "../components/preloader/preloader";
import { resetPassword } from "../utils/api";


const ForgotPasswordPage = () => {
  const { user } = useSelector(store => store.auth);
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState({
    email: ''
  });

  const [isRequest, setRequest] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setRequest(true);
    resetPassword(data)
      .then((res) => {
        setRequest(false);
        history.replace({pathname: '/reset-password', state: { from: location }});
      })
      .catch((err) => {
        setRequest(false);
        alert(err);
      })
  };



  return (
    <>
      {isRequest && <Preloader />}
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
    </>
  );
};

export default ForgotPasswordPage;
