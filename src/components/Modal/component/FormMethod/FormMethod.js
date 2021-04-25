import { useDispatch, useSelector } from 'react-redux';

import { changeIsLogin, isRegister, selectIsLogin, selectTitle } from '../../../../store/isLogin';

import s from './formmethod.module.css';

export const FormMethod = () => {
    
    const isLogin = useSelector(selectIsLogin);
    const title = useSelector(selectTitle);
    const dispatch = useDispatch();

    return (<>
        <div className={ s.login } >{ title }</div>
        { isLogin 
            ? (<>
                <div className={ s.eula }>Входя в систему, вы соглашаетесь на смехотворно длинные сроки, которые вы даже не удосужились прочитать)</div>
                <div className={ s.question }>Еще нет аккаунта?</div>
                <div 
                    className={ s.btn }
                    onClick={ () => dispatch(isRegister('Регистрация')) }
                >Пройти регистрацию</div>
            </>)
            : (<>
                <div className={ s.eula }>Регистрируясь в системе, вы соглашаетесь на смехотворно длинные сроки, которые вы даже не удосужились прочитать)</div>
                <div className={ s.question }>Уже есть аккаунт?</div>
                <div 
                    className={ s.btn }
                    onClick={ () => dispatch(changeIsLogin('Авторизация')) }
                >Войти</div>
            </>) 
        }
    </>)
}