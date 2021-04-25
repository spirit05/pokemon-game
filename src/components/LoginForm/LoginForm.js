import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Input } from "../Input/Input";
import { selectBtnValue } from "../../store/isLogin";

import s from './loginForm.module.css';

export const LoginForm = ({ onSubmitData, isOpen }) => {

    const btnName = useSelector(selectBtnValue);
    
    // Устанавливаем первоначальное состояние email и password
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // Функция для сброса формы
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    // Очищаем данные формы при закрытии модального окна
    useEffect(() => {
        resetForm();
    }, [isOpen]);

    // Передаем заполненные email и password d MenuHeader при отправке данных с формы
    const handlerSubmit = e => {
        // Отключаем поведение по умочанию для отмены перезагрузки страницы после нажатия кнопки
        e.preventDefault();

        onSubmitData && onSubmitData({
            email,
            password
        });

        // Очищаем поля формы после отправки
        resetForm();
    };

    return (
        <form onSubmit={ handlerSubmit } >
            <Input
                type={ 'email' }
                name ={ 'email' }
                placeholder={ 'Ввeдите ваш email' }
                value={ email }
                onChange={ (e) => setEmail(e) }
                autoComplete={ 'off' }
                required
            />
            <Input 
                type={ 'password' }
                name={ 'password' }
                placeholder={ 'Введите пароль' }
                value={ password }
                onChange={ (e) => setPassword(e) }
                required
            />
            <Input 
                type={ 'submit' } 
                value={ btnName }
                name={ 'submit' }
                className={ s.submit }
            />
        </form>
    );
};