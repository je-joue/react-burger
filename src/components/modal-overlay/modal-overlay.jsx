import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}
