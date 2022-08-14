import React, { Component } from 'react';
import { Notify, Report } from 'notiflix/build/notiflix-notify-aio';
import getImages from '../servaice/fetch-api';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    // nameImage: '',
    isLoading: false,
  }

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
    }

    try {
        const response = await getImages(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalHits: response.totalHits,
        }));

      if (page === 1 && response.totalHits !== 0) {
          Notify.success(`Hooray! We found ${response.totalHits} images.`);
        }
          

      if (response.totalHits === 0) {
          Report.failure(
        'Found nothing for you.',
        'Please keep the correct request.',
        'Okay',
          );
        }
          
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
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
    
    
  render() {
        const {images, isLoading,} = this.state;
    return (
      <div>
        <Serchbar onSubmit={this.formSubmit} />
        <ImageGallery images={images}/>
        {isLoading && <Loader />}
      </div>
    )
  }
};
