import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs'
import {Overlay, ModalWrapp} from './Modal.styled'

const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                this.props.toggleModal();
            }
        })
    }

    componentWillUnmount (){

    }

    onCloseModal = () => {
        this.props.toggleModal();
    }

    render() {
        return (
            createPortal(
                <Overlay onClick={this.onCloseModal}>
                    <button type='button' onClick={this.onCloseModal}>x{BsXLg}</button>
                <ModalWrapp>
                    {this.props.children}
                </ModalWrapp>
            </Overlay>,
                modalRoot
        )
        )
    }
}
