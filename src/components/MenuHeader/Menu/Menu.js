import { Link } from "react-router-dom";

import cn from 'classnames';
import s from './menu.module.css';

const MENU = [
    {
        title: 'Главная',
        to: '/'
    },
    {
        title: 'Игра',
        to: '/game'
    },
    {
        title: 'О нас',
        to: '/about'
    },
    {
        title: 'Контакты',
        to: '/contact'
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