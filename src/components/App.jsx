import { Component } from 'react';
import { fetchImages } from 'api/Api';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Searchbar } from './SearchBar/SearchBar';
import { Section } from './Section/Section';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader.jsx';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    toralImages: 0,
    error: null,
    modal: {
      showModal: false,
      largeImageURL: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { page, query, error } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImagesByQuery();
    }

    if (prevState.error !== error && error) {
      Report.warning('Warning', 'Something went wrong', 'Okay');
    }
  }

  fetchImagesByQuery = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetchImages(query, page);

      if (response.totalHits === 0) {
        Report.warning(
          'Warning',
          'No images found. Please try another query.',
          'Okay'
        );
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        toralImages: response.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changeQuery = query => {
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  onClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const {
      page,
      images,
      isLoading,
      lastPage,
      error,
      showModal,
      largeImageURL,
    } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar changeQuery={this.changeQuery} />
        <Section>
          {isLoading && <Loader />}
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        </Section>
        {page < lastPage && !isLoading && !error ? (
          <Button label={'Load more'} handleLoadMore={this.handleLoadMore} />
        ) : (
          <div style={{ height: 40 }}></div>
        )}
        {showModal && (
          <Modal onClose={this.onClose} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}
