import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import { ReactComponent as LoginSVG } from '../../../img/login.svg';
import { ReactComponent as ExitSVG } from '../../../img/exit.svg';
import { ReactComponent as UserSVG } from '../../../img/user.svg';

import cn from 'classnames';
import s from './navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectLocalId, selectUserLoading } from '../../../store/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const NavBar = ( { id, bgActive = false, onChangeMenu, isMenuActive, onClickLogin } ) => {
    const isUserLoading = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalId);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlerExit = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        history.replace('/');
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
                        (!isUserLoading && !localId) && (
                            <div 
                                className={ s.loginWrap }
                                onClick={ onClickLogin }
                            >
                                <LoginSVG />
                            </div>
                        )
                    }
                    {
                        (!isUserLoading && localId) && (
                            <>
                                <Link 
                                    className={ s.loginWrap }
                                    to={ '/user' }
                                >
                                    <UserSVG />
                                </Link>
                                <div 
                                    className={ s.loginWrap }
                                    onClick={ handlerExit }
                                >
                                    <ExitSVG />
                                </div>
                            </>
                        )
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