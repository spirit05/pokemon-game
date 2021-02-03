import s from './header.module.css';

const Header = ({ title, descr, onClickButton }) => {
    const handlerClick = () => {
        console.log('####: <Header />');
        onClickButton && onClickButton('game');
    }

    return (
        <>
            <header className={s.root}>
                <div className={ s.forest }></div>
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