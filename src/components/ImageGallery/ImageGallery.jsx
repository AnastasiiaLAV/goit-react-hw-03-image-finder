import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
    console.log('images', images)
    return (
        <ul className="gallery">
            {images.map((image) => (
                <ImageGalleryItem key={image.id} {...image} />
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
};

export default ImageGallery;

