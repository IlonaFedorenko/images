import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={css.imageGalleryItemImage}
        onClick={() => openModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
