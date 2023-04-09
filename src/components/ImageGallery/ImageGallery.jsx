import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';


export class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;
    return (
      <ul className={style.imageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onImageClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};