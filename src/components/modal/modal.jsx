import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

function Modal({ title, closeModal, children }) {
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [handleEscKeydown]);

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles['title-wrap']} pt-10 pr-10 pl-10`}>
          <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
          <button className={styles['close-button']}>
            <CloseIcon type="primary" onClick={closeModal} />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalsContainer
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
