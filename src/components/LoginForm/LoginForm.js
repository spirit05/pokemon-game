import { useState } from "react";

import s from './loginForm.module.css';
import { Input } from "../Input/Input";

export const LoginForm = ({ onSubmitData }) => {
    
    // Устанавливаем первоначальное состояние email и password
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
 
    // Передаем заполненные email и password d MenuHeader при отправке данных с формы
    const handlerSubmit = e => {
        // Отключаем поведение по умочанию для отмены перезагрузки страницы после нажатия кнопки
        e.preventDefault();

        onSubmitData && onSubmitData({
            email,
            password
        });

        // Очищаем поля формы после отправки
        setPassword('');
        setEmail('');
    };

    return (
        <form onSubmit={ handlerSubmit }>
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
                value={ 'Submit' }
                name={ 'submit' }
                className={ s.submit }
            />
        </form>
    );
};