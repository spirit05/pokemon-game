import anime from 'animejs';

import cn from 'classnames';
import s from './input.module.css';

let current = null;

const animeInput = (e) => {

    // Получаем имя элемента на который установлен фокус
    const t = e.target.name;
    // Устанавливаем значение strokeDashoffset => value в соответствии с именем элемента
    const nameValueOffset = t === 'email' ? 0 : t === 'password' ? -336 : -730;

    if (current) current.pause();
    // Отрисовываем анимацию при переходе фокуса с одного элемента к другому используя библиотеку animate
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: nameValueOffset,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: t === 'submit' ? '530 1386' : '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    })
}

export const Input = ({ type = 'text', name = '', placeholder = null, value, onChange, required = false, autoComplete = null }) => {

    // Передаем значение введенных символов в LogInForm
    const handlerChange = val => {

        onChange && onChange(val);
    };

    return (
        <>
                <label className={ s.label } htmlFor={ name }>{ type !== 'submit' && name }</label>
                <input 
                    type={ type }
                    name={ name }
                    placeholder={ placeholder }
                    className={ cn(s.input, s.valid) }
                    value={ value }
                    onFocus={ (e) => animeInput(e) }
                    onChange={ (e) => handlerChange(e.target.value) }
                    required={ required }
                    autoComplete={ autoComplete }
                />
        </>
    )
};