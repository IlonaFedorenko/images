import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './ImageGalleryItem.module.css';


export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, largeImageURL, onImageClick } = this.props;
    return (
      <li className={style.imageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={style.imageGalleryItemImage}
          onClick={() => onImageClick(largeImageURL)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};