import React from 'react';

const Modal = ({largeImageURL, tags}) => {
    return (
        <div className="overlay">
            <div className="modal">
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>
        )
}

export default Modal;