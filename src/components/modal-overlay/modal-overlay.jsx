import React from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default ModalOverlay;
