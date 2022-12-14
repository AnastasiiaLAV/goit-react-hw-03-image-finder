import React, { Component } from 'react';
import { Notify} from 'notiflix/build/notiflix-notify-aio';
import getImages from '../servaice/fetch-api';
import Serchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { AppWrapper } from './App.styled';
export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    totalPages: null,
    isLoading: false,
    error: null,
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
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
        }));
  }

  render() {
    const { images, isLoading, totalHits} = this.state;
    const showBtn = images.length !== 0 && images.length !== totalHits && !isLoading;
    return (
      <AppWrapper>
        <Serchbar onSubmit={this.formSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {showBtn && <Button onClick={this.loadMore} />}
      </AppWrapper>
    )
  }
};
