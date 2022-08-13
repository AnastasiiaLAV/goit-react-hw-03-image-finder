import React, { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

export default class Serchbar extends Component{
    state = {
        nameImage: '',
    }
    
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };
    
    handleNameChange = event => {
        this.setState({ nameImage: event.currentTarget.value.toLowerCase() });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.nameImage.trim() === '') {
          return Notify.warning('Enter your request');
            
        }
        this.props.onSubmit(this.state.nameImage)
        this.setState({nameImage: ''})
    }

    render() {
        const { nameImage } = this.state;
        const { handleNameChange, handleSubmit } = this;
        return (
            <header className="searchbar">
                <form className="form" onSubmit={handleSubmit}>
                    <button type="submit" className="button">
                    <span className="button-label">Search</span>
                    </button>

                    <input
                    className="input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    value={nameImage}
                    onChange={handleNameChange}
                    />
                </form>
            </header>
        )
    }
}
