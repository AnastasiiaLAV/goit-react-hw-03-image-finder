import React, { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

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
            <header className="searchbar">
                <form className="form" onSubmit={handleSubmit}>
                    <button type="submit" className="button">
                    <span className="button-label">Search</span>
                    </button>

                    <input
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={queryImage}
                    onChange={handleNameChange}
                    />
                </form>
            </header>
        )
    }
}
