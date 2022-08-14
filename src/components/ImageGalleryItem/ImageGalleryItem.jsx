import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import {GalleryItem, GalleryImage } from './ImageGalleryItem.styled'
class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    static propTypes = {
        id: PropTypes.number,
        largeImageURL: PropTypes.string,
        webformatURL: PropTypes.string,
        tags: PropTypes.string,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
        showModal: !showModal,
        }));
    }

    render() {
        const { showModal } = this.state;
        const { id, largeImageURL, webformatURL, tags } = this.props;

        return (
        <>
            <GalleryItem onClick={this.toggleModal}>
                <GalleryImage src={webformatURL} alt={tags} key={id}/>
            </GalleryItem>
            {showModal && (
                <Modal onClose={this.toggleModal} image={largeImageURL} tags={tags} />
            )}
        </>
        );
    }
    }


export default ImageGalleryItem;

