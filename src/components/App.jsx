import React, { useState, useEffect } from 'react';
import { fetchImages } from 'api/Api';

import { Searchbar } from './SearchBar/SearchBar';
import { Section } from './Section/Section';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader.jsx';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const per_page = 12;

  useEffect(() => {
    getImages(query, page);
  }, [query, page]);

  const getImages = async (query, page) => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(query, page);
      if (hits.length === 0) {
        return alert('Sorry, nothing found 🤷‍♂️');
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onloadMore = () => {
    setPage(prevPage => prevPage + 1);
    // setPage(prevState => ({ page: prevState.page + 1 }));
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={formSubmit} />
      <Section>
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
      </Section>

      {error && <p>something wrong</p>}

      {loadMore && <Button onloadMore={onloadMore} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};
