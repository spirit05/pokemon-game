import { useHistory } from "react-router-dom";

import { Button } from "../Button/Button";

import s from './header.module.css';

const Header = ({ title, descr }) => {
    const history = useHistory();

    const handlerClick = () => {

        history.push('/game');
        
    }

    return (
        <>
            <header className={s.root}>
                <div className={ s.forest } />
                <div className={ s.silhouette } />
                <div className={ s.moon } />

                <div className={ s.container }>
                    <h1>{ title }</h1>
                    <p>{ descr }</p>
                    <Button 
                        cb={handlerClick}
                        className={s.homeBtn}
                        title={'Начать игру'}
                    />
                </div>
            </header>
        </>
    )
}

export default Header;