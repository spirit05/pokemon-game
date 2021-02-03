import { Link } from "react-router-dom";

import cn from 'classnames';
import s from './menu.module.css';

const MENU = [
    {
        title: 'HOME',
        to: '/'
    },
    {
        title: 'GAME',
        to: 'game'
    },
    {
        title: 'ABOUT',
        to: 'about'
    },
    {
        title: 'CONTACT',
        to: 'contact'
    }
];

export const Menu = ({ isMenuActive, onChangeMenu }) => {
    return (
        <div className={ cn(s.menuContainer, {
            [s.active]: isMenuActive === true,
            [s.deactive]: isMenuActive === false
        }) } >
            <div className={ s.overlay } />
            <div className={ s.menuItems } >
                <ul>
                    {
                        MENU.map(({ title, to }, index) => (
                            <li key={index}
                                onClick={ onChangeMenu }
                            >
                                <Link to={to}>
                                    {title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};