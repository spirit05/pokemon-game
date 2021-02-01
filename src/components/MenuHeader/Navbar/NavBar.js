import cn from 'classnames';
import s from './navbar.module.css';

export const NavBar = ( { id, onChangeMenu, menuActive } ) => {
    const handlerHumburgerClick = () => {
        onChangeMenu && onChangeMenu(!menuActive)
    }

    return (
        <nav className={ s.navbar } id={ id }>
            <div className={ s.navWrapper } >
                <p className={ s.brand } >
                    LOGO
                </p>
                <div 
                    className={ cn(s.menuButton, { [s.active]: menuActive } ) }
                    onClick={ handlerHumburgerClick }
                >
                    <span />
                </div>
            </div>
        </nav>
    );
};