import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
