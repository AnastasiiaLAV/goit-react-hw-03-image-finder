import React from 'react';

const ImageGalleryItem = ({id, webformatURL, largeImageURL, tags }) => {
    return (
        <li className="gallery-item" key={id}>
                <img src={webformatURL} alt={tags} />
            </li>
        )
}

export default ImageGalleryItem;