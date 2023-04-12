import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>
        <img className={css.ModalImage} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
