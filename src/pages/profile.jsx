import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import formStyles from './forms.module.css';

import Preloader from '../components/preloader/preloader';
import ProfileMenu from '../components/profile-menu/profile-menu';

import { updateUserInfo, getUserInfo } from '../services/actions/auth-actions';

function ProfilePage() {

  const dispatch = useDispatch();
  const { isRequest } = useSelector((store) => store.auth);
  const { name, email } = useSelector((store) => store.auth.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const [isOnChange, setOnChange] = useState(false);

  const [values, setValues] = useState({
    name: name,
    login: email,
    password: ''
  });

  const [passwordInputType, setPasswordInputType] = useState('password');

  const userData = useMemo(
    () => ({
      name: values.name,
      email: values.login,
      password: values.password,
    }),
    [values.name, values.login, values.password]
  );

  const nameInputRef = useRef(null);
  const loginInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
    setOnChange(true);
  }, []);


  const handleBlur = useCallback((e) => {
    e.target.disabled = true;
  }, []);

  const handlePasswordBlur = useCallback(
    (e) => {
      handleBlur(e);
      setPasswordInputType('password');
    },
    [handleBlur]
  );

  const handleIconClick = useCallback((ref) => {
    ref.current.disabled = false;
    ref.current.focus();
  }, []);

  const handlePasswordIconClick = useCallback(
    (ref) => {
      handleIconClick(ref);
      setPasswordInputType('text');
    },
    [handleIconClick]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserInfo(userData));
      setOnChange(false);
    },
    [dispatch, userData]
  );

  const handleCancelClick = useCallback(
    (e) => {
      e.preventDefault();
      setValues({
        name: name,
        login: email,
        passwordValue: ''
      });
      setOnChange(false);
    },
    [email, name]
  );

  return (
    <>
      {isRequest && <Preloader />}

      <div className={`mt-30 ${styles.container}`}>
        <ProfileMenu description="В этом разделе вы можете изменить свои персональные данные" />

        <form onSubmit={handleSubmit} className={formStyles.form}>
          <div className={`mb-6 ${formStyles.input}`}>
            <Input
              ref={nameInputRef}
              type='text'
              placeholder='Имя'
              icon={'EditIcon'}
              name='name'
              value={values.name}
              onChange={handleChange}
              onIconClick={() => handleIconClick(nameInputRef)}
              onBlur={handleBlur}
              disabled
            />
          </div>

          <div className={`mb-6 ${formStyles.input}`}>
            <Input
              ref={loginInputRef}
              type='text'
              placeholder='Логин'
              icon='EditIcon'
              name='login'
              value={values.login}
              onChange={handleChange}
              onIconClick={() => handleIconClick(loginInputRef)}
              onBlur={handleBlur}
              disabled
            />
          </div>

          <div className={`mb-6 ${formStyles.input}`}>
            <Input
              ref={passwordInputRef}
              type={passwordInputType}
              placeholder='Пароль'
              icon='EditIcon'
              name='password'
              value={values.password}
              onChange={handleChange}
              onIconClick={() => handlePasswordIconClick(passwordInputRef)}
              onBlur={handlePasswordBlur}
              disabled
            />
          </div>

          {isOnChange && (
            <div className={styles['buttons-container']}>
              <Button type='secondary' onClick={handleCancelClick}>
                Отмена
              </Button>
              <Button type='primary'>Сохранить</Button>
            </div>
          )}

        </form>

      </div>
    </>
  );
};

export default ProfilePage;






