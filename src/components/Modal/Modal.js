import { useEffect, useRef } from 'react';

import cn from 'classnames';
import s from './modal.module.css';

export const Modal = ({ isOpen, title, children, onCloseModal }) => {

    // Присваиваем переменной modalElement ссылку на объект в котором прописано свойство ref
    // Хук useRef не приводит к повторному перерендериванию компонента даже когда происходит изменение данных в нем
    const modalElem = useRef();

    // Отключаем скролл при открытом модальном окне
    useEffect(() => {

        document.body.style.overflow = isOpen ? 'hidden' : null;

    }, [isOpen]);

    // Закрываем модальное окно при клике на крестик
    const handlerCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }

    // Закрываем мод окно при клике вне мод окна используя хук useRef
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