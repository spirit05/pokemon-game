import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';

import { selectIsLogin } from "../../store/isLogin";

import { LoginForm } from "../LoginForm/LoginForm";
import { Modal } from "../Modal/Modal";
import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";
import fetchAuthClass from "../../service/fetchAuth";

export const MenuHeader = ( { bgActive } ) => {

    // Получаем состояние формы - авторизация или регистрация
    const isLogin = useSelector(selectIsLogin);

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
    const handlerSubmit = async ( {email, password} ) => {

        const param = {
            email,
            password,
            returnSecureToken: true
        }



        // Если состояние isLogin = true, то проводим авторизацию, в противном случае проводим регистрацию
        if(isLogin) {
            const response = await fetchAuthClass.getLoginData(param);

            if(response.hasOwnProperty('error')) {
                 NotificationManager.error(response.error.message, 'Ошибка!');
            } else { 
                localStorage.setItem('idToken', response.idToken);
                localStorage.setItem('email', response.email);
                handlerClickLogin();
            }
        } else {
            const response = await fetchAuthClass.getRegisterData(param);

            if(response.hasOwnProperty('error')) { 
                NotificationManager.error(response.error.message, 'Ошибка!');
            } else { 
                localStorage.setItem('idToken', response.idToken);
                localStorage.setItem('email', response.email);
                NotificationManager.success('В успешно зарегистрированы!');
                handlerClickLogin();
            }
        } 

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
                onCloseModal={ handlerClickLogin }
            >
                <LoginForm 
                    onSubmitData={ handlerSubmit }
                    isOpen={ isOpenModal }
                />

            </Modal>
        </>
    );
};
