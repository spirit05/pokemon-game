import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';

import { selectIsLogin } from "../../store/isLogin";

import { LoginForm } from "../LoginForm/LoginForm";
import { Modal } from "../Modal/Modal";
import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";
import fetchAuthClass from "../../service/fetchAuth";
import { getUserUpdateAsync } from "../../store/user";

export const MenuHeader = ( { bgActive } ) => {

    // Получаем состояние формы - авторизация или регистрация
    const isLogin = useSelector(selectIsLogin);
    const type = isLogin ? 'login' : 'singup';

    // Устанавливаем первоначальное состояние показа меню и модального окна
    const [isMenuActive, setMenuActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();
    

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
        console.log('response: ', response);

        if(response.hasOwnProperty('error')) {
             NotificationManager.error(response.error.message, 'Ошибка!');
             handlerClickLogin();
        } else { 
            if(type === 'singup') {
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());

                console.log('singup data', pokemonsStart);

                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemon-game-3922e-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    });
                }
            }
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Вы успешно вошли в игру!');
            dispatch(getUserUpdateAsync());
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
