import React, { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BsSearch } from 'react-icons/bs'
import PropTypes from 'prop-types';

import {Searchbar, SearchForm, SearchFormBtn,SearchFormBtnLable,SearchFormInput} from './Searchbar.styled.js'
export default class Serchbar extends Component{
    state = {
        queryImage: '',
    }
    
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };
    
    handleNameChange = event => {
        this.setState({ queryImage: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.queryImage.trim() === '') {
            return Notify.warning('Enter your request');
        }
        this.props.onSubmit(this.state.queryImage)
        this.setState({queryImage: ''})
    }

    render() {
        const { queryImage } = this.state;
        const { handleNameChange, handleSubmit } = this;
        return (
            <Searchbar className="searchbar">
                <SearchForm className="form" onSubmit={handleSubmit}>
                    <SearchFormBtn type="submit" className="button">
                        <BsSearch/>
                    <SearchFormBtnLable className="button-label">Search</SearchFormBtnLable>
                    </SearchFormBtn>

                    <SearchFormInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={queryImage}
                    onChange={handleNameChange}
                    />
                </SearchForm>
            </Searchbar>
        )
    }
}
