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
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    console.log(largeImageURL);
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
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={openModal} />
        )}
      </Section>
      {error && <p>something wrong</p>}

      {loadMore && <Button onloadMore={onloadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

// export const App = () => {
//   const [query, setQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [largeImageURL, setLargeImageURL] = useState('');

//   useEffect(() => {
//     getImages(query, page);
//   }, [query, page]);

//   const getImages = async (query, page) => {
//     if (!query) {
//       return;
//     }
//     setIsLoading(true);

//     try {
//       const { hits, totalHits } = await fetchImages(query, page);
//       if (hits.length === 0) {
//         return alert('Sorry, nothing found 🤷‍♂️');
//       }
//       console.log(hits, totalHits);
//       setImages(prevImages => [...prevImages, ...hits]);
//     } catch (error) {
//       setError({ error });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changeQuery = query => {
//     setQuery(query);
//     setImages([]);
//     setPage(1);
//     setIsLoading(false);
//   };

//   const onImageClick = largeImageURL => {
//     setShowModal({ showModal: true, largeImageURL: largeImageURL });
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const onClose = () => {
//     setShowModal(false);
//   };

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '1fr',
//         gridGap: 16,
//         paddingBottom: 24,
//       }}
//     >
//       <Searchbar changeQuery={changeQuery} />
//       <Section>
//         {isLoading && <Loader />}
//         <ImageGallery images={images} onImageClick={onImageClick} />
//       </Section>
//       {page < setPage && !isLoading && !error ? (
//         <Button label={'Load more'} handleLoadMore={handleLoadMore} />
//       ) : (
//         <div style={{ height: 40 }}></div>
//       )}
//       {showModal && <Modal onClose={onClose} largeImageURL={largeImageURL} />}
//     </div>
//   );
//

// import { Component } from 'react';
// import { fetchImages } from 'api/Api';
// import { Report } from 'notiflix/build/notiflix-report-aio';

// import { Searchbar } from './SearchBar/SearchBar';
// import { Section } from './Section/Section';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
// import { Loader } from './Loader/Loader.jsx';

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     toralImages: 0,
//     error: null,
//     modal: {
//       showModal: false,
//       largeImageURL: '',
//     },
//   };

//   componentDidUpdate(_, prevState) {
//     const { page, query, error } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.fetchImagesByQuery();
//     }

//     if (prevState.error !== error && error) {
//       Report.warning('Warning', 'Something went wrong', 'Okay');
//     }
//   }

//   fetchImagesByQuery = async () => {
//     const { page, query } = this.state;
//     this.setState({ isLoading: true, error: null });
//     try {
//       const response = await fetchImages(query, page);

//       if (response.totalHits === 0) {
//         Report.warning(
//           'Warning',
//           'No images found. Please try another query.',
//           'Okay'
//         );
//         return;
//       }

//       this.setState(prevState => ({
//         images: [...prevState.images, ...response.hits],
//         toralImages: response.totalHits,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   changeQuery = query => {
//     this.setState({ query, images: [], page: 1 });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   onImageClick = largeImageURL => {
//     this.setState({ showModal: true, largeImageURL: largeImageURL });
//   };

//   onClose = () => {
//     this.setState({ showModal: false, largeImageURL: '' });
//   };

//   render() {
//     const {
//       page,
//       images,
//       isLoading,
//       lastPage,
//       error,
//       showModal,
//       largeImageURL,
//     } = this.state;

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: 16,
//           paddingBottom: 24,
//         }}
//       >
//         <Searchbar changeQuery={this.changeQuery} />
//         <Section>
//           {isLoading && <Loader />}
//           <ImageGallery images={images} onImageClick={this.onImageClick} />
//         </Section>
//         {page < lastPage && !isLoading && !error ? (
//           <Button label={'Load more'} handleLoadMore={this.handleLoadMore} />
//         ) : (
//           <div style={{ height: 40 }}></div>
//         )}
//         {showModal && (
//           <Modal onClose={this.onClose} largeImageURL={largeImageURL} />
//         )}
//       </div>
//     );
//   }
