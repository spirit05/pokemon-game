import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';

import { selectIsLogin } from "../../store/isLogin";

import { LoginForm } from "../LoginForm/LoginForm";
import { Modal } from "../Modal/Modal";
import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";
import fetchAuthClass from "../../service/fetchAuth";
import { loginUser, handlerExit } from '../../service/utils/utils';

export const MenuHeader = ( { bgActive } ) => {

    // Получаем состояние формы - авторизация или регистрация
    const isLogin = useSelector(selectIsLogin);
    const type = isLogin ? 'login' : 'singup';

    // Устанавливаем первоначальное состояние показа меню и модального окна
    const [isMenuActive, setMenuActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const [ userEmail, setUserEmail ] = useState('');
    
    useEffect(()=> {
        loginUser(setUserEmail);
    },[userEmail]);

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
        const response = await fetchAuthClass.getLoginSingupData(param, type);

        if(response.hasOwnProperty('error')) {
             NotificationManager.error(response.error.message, 'Ошибка!');
        } else { 
            localStorage.setItem('idToken', response.idToken);
            localStorage.setItem('email', response.email);
            NotificationManager.success('Вы успешно вошли в игру!');
            setUserEmail(response.email)
            handlerClickLogin();
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
                user={ userEmail }
                handlerExitUser={ () => handlerExit(setUserEmail) }
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
