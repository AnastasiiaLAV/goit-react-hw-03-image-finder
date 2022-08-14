import React, { Component } from 'react';
import { Notify} from 'notiflix/build/notiflix-notify-aio';
import getImages from '../servaice/fetch-api';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    // nameImage: '',
    isLoading: false,
    error: null,
    showModal: false,
  }

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
    

    try {
        const response = await getImages(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalHits: response.totalHits,
        }));

      if (page === 1 && response.totalHits !== 0) {
          Notify.success(`Hooray! We found ${response.totalHits} images.`);
        }
          

      if (response.hits.length === 0) {
          Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
        }
          
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmit = value => {
    if (value.trim() === '') {
      return Notify.warning('Enter your request');
    }
    this.setState({
      images: [],
      query: value,
      page: 1,
    });
  };
    
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    }
    
  render() {
        const {images, isLoading, showModal } = this.state;
    return (
      <div>
        <Serchbar onSubmit={this.formSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClick={this.toggleModal}/>
        {/* {showModal && <Modal/>} */}
      </div>
    )
  }
};
