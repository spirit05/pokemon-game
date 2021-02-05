import { useHistory } from "react-router-dom";

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
                    <button onClick={handlerClick}>
                        Start Game
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;