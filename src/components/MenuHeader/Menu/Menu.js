import cn from 'classnames';
import s from './menu.module.css';

export const Menu = ({ menuActive }) => {
    const classMenu = menuActive ? s.active : s.deactive;

    return (
        <div className={ cn(s.menuContainer, classMenu) } >
            <div className={ s.overlay } />
            <div className={ s.menuItems } >
                <ul>
                    <li>
                        <a href="#welcome">
                        HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game">
                        GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                        ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                        CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};