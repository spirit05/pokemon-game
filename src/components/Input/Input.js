import { animeInput } from '../../service/utils/utils';

import cn from 'classnames';
import s from './input.module.css';

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