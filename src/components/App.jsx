import React, { Component } from 'react';

import Serchbar from './Searchbar/Searchbar';

export default class App extends Component {
  state = {
    nameImage: '',
    collection: [],
    isLoading: false,
    showBtn: false,

    page: null,
    query: null,
    per_page: 12,

    modal: {
      show: false,
      imgId: null,
    },
  }

  formSubmit = nameImage => {
    console.log('nameImage', nameImage)
  }
    
    
  render() {
    return (
      <div>
      <Serchbar onSubmit={this.formSubmit}/>

        
      </div>
    )
  }
};
