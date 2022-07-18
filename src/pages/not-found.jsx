import React from "react";
import { Link } from "react-router-dom";

import styles from './not-found.module.css';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className='text text_type_digits-large mb-10'>404</h1>
      <p className='text text_type_main-medium'>Страница не найдена :(</p>
      <Link to='/' className={`${styles.link} text text_type_main-medium mt-10`}>Вернуться на главную</Link>
    </div>
  )
}

export default NotFoundPage;
