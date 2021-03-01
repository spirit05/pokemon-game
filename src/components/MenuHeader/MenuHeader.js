import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { Modal } from "../Modal/Modal";

import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";

export const MenuHeader = ( { bgActive } ) => {

    // Устанавливаем первоначальное состояние показа меню и модального окна
    const [isMenuActive, setMenuActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);

    // Меняем состояние, показывая/скрывая меню при нажатии гамбургера
    const handlerChangeMenu = () => {

        setMenuActive(prevState => !prevState);
    };

    // Меняем состояние, показывая/скрывая модальное окно при нажатии на иконку
    const handlerClickLogin = () => {
        setOpenModal(prevState => !prevState);
    };

    // Принимаем данные с формы для последущей обработки
    const handlerSubmit = ( value ) => {
        console.log('#### submit: ', value);
    }

    return (
        <>
            <Menu 
                isMenuActive={ isMenuActive }
                onChangeMenu={ handlerChangeMenu }
            />
            <NavBar 
                id="navbar"
                isMenuActive={ isMenuActive }
                bgActive={ bgActive }
                onChangeMenu={ handlerChangeMenu }
                onClickLogin={ handlerClickLogin }
            />
            <Modal 
                isOpen={ isOpenModal }
                title={ "Log In ..." } 
                onCloseModal={ handlerClickLogin }
            >
                <LoginForm 
                    onSubmitData={ handlerSubmit }
                />

            </Modal>
        </>
    );
};
