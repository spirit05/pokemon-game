import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import { ReactComponent as LoginSVG } from '../../../img/login.svg';
import { ReactComponent as ExitSVG } from '../../../img/exit.svg';

import cn from 'classnames';
import s from './navbar.module.css';

export const NavBar = ( { id, bgActive = false, onChangeMenu, isMenuActive, onClickLogin } ) => {
    
    const user = localStorage.getItem('email');

    const handlerExit = () => {
            localStorage.removeItem('idToken');
            localStorage.removeItem('email');
    }

    return (
        <nav id={ id } className={ cn(s.navbar, { [s.bgActive]: bgActive } )} >
            <div className={ s.navWrapper } >
                <p className={ s.brand } >
                    <Link to='/' className={s.logo}>
                        <img src={ logo } alt="LOGO"/>
                    </Link>
                </p>
                <div className={ s.loginAndMenu } >
                    {
                        user
                            ? (
                                <div 
                                    className={ s.userEmail }
                                    onClick={ handlerExit }
                                > { user } 
                                    <ExitSVG />
                                </div>
                            )
                            : (<div 
                                className={ s.loginWrap }
                                onClick={ onClickLogin }
                            >
                                <LoginSVG />
                            </div>)
                    }
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