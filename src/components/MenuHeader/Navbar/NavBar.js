import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png'
import { ReactComponent as LoginSVG } from '../../../img/login.svg';

import cn from 'classnames';
import s from './navbar.module.css';

export const NavBar = ( { id, bgActive = false, onChangeMenu, isMenuActive, onClickLogin } ) => {
    return (
        <nav id={ id } className={ cn(s.navbar, { [s.bgActive]: bgActive } )} >
            <div className={ s.navWrapper } >
                <p className={ s.brand } >
                    <Link to='/' className={s.logo}>
                        <img src={ logo } alt="LOGO"/>
                    </Link>
                </p>
                <div className={ s.loginAndMenu } >
                    <div 
                        className={ s.loginWrap }
                        onClick={ onClickLogin }
                    >
                        <LoginSVG />
                    </div>
                    <div 
                        className={ cn(s.menuButton, { [s.active]: isMenuActive } )}
                        onClick={ onChangeMenu }
                    >
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
};