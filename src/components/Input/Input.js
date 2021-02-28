import cn from 'classnames';
import s from './input.module.css';

export const Input = ({ type = 'text', name = '', placeholder = null, value, onChange, required = false }) => {

    // Передаем значение введенных символов в LogInForm
    const handlerChange = val => {

        onChange && onChange(val);
    };

    return (
        <div className={ s.root }>
                <input 
                    type={ type }
                    name={ name }
                    placeholder={ placeholder }
                    className={ cn(s.input, s.valid) }
                    value={ value }
                    onChange={ (e) => handlerChange(e.target.value) }
                    required={ required }
                />
                <span className={ s.highlight } />
                <span className={ s.bar } />

                { 
                    // Если value пусто то не показывать lable 
                    value && <label className={ s.label }>{ name }</label> 
                }
        </div>
    )
};