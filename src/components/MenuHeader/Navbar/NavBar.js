import { Link } from 'react-router-dom';

import cn from 'classnames';
import s from './navbar.module.css';

export const NavBar = ( { id, bgActive = false, onChangeMenu, isMenuActive } ) => {
    return (
        <nav id={ id } className={ cn(s.navbar, { [s.bgActive]: bgActive } )} >
            <div className={ s.navWrapper } >
                <p className={ s.brand } >
                    <Link to='/' className={s.logo}>
                        LOGO
                    </Link>
                </p>
                <div 
                    className={ cn(s.menuButton, { [s.active]: isMenuActive } )}
                    onClick={ onChangeMenu }
                >
                    <span />
                </div>
            </div>
        </nav>
    );
};