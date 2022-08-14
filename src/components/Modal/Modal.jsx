import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import {Overlay, ModalWrapp, Image} from './Modal.styled'

const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {
    // static propTypes = {
    //     image: PropTypes.string,
    //     onClose: PropTypes.func,
    //     tags: PropTypes.string,
    // };

    componentDidMount() {
        window.addEventListener('keydown', this.onCloseModal)
    }

    componentWillUnmount (){
        window.removeEventListener('keydown', this.onCloseModal)
    }

    onCloseModal = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    onCloseModalOnBackdrop = (e) => {
        if (e.target === e.currentTarget) {
        this.props.onClose();
        }
    };
    
    render() {
        const { image, tags } = this.props;
        return (
            createPortal(
                <Overlay onClick={this.onCloseModalOnBackdrop}>
                    <ModalWrapp>
                        <Image src={image} alt={tags} />
                    </ModalWrapp>
                </Overlay>,
                modalRoot)
        )}
}

    // Modal.propTypes = {
    //     image: PropTypes.string,
    //     onClose: PropTypes.func,
    //     tags: PropTypes.string,
    // };