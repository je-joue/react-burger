import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onCloseButtonClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles['title-wrap']} pt-10 pr-10 pl-10`}>
          <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
          <button className={styles['close-button']}>
            <CloseIcon type="primary" onClick={onCloseButtonClick} />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onCloseButtonClick} />
    </>,
    modalsContainer
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
