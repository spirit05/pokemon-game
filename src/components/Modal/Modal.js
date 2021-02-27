import { useEffect, useRef } from 'react';

import cn from 'classnames';
import s from './modal.module.css';

export const Modal = ({ isOpen, title, children, onCloseModal }) => {

    const modalElem = useRef();

    useEffect(() => {

        document.body.style.overflow = isOpen ? 'hidden' : null;

    }, [isOpen]);

    const handlerCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }

    const handlerClickRoot = e => {
        if(!modalElem.current.contains(e.target)) {
            handlerCloseModal();
        }
    }

    return (
        <div 
            className={ cn(s.root, {
                [s.open]: isOpen === true 
            }) }
            onClick={ handlerClickRoot }
         >
            <div 
                ref= { modalElem }
                className={ s.modal }
            >
                <div className={ s.head }>
                                { title }
                    <span 
                        className={ s.btnClose } 
                        onClick={ handlerCloseModal }
                    />
                </div>
                <div className={ s.content }>
                    { children }
                </div>
            </div>
        </div>
    );
};