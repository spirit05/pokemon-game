import s from './game.module.css';

export const GamePage = ( { onChangePage } ) => {

    const handlerBackHome = () => {
        console.log('####: Home');
        onChangePage && onChangePage('app')
    }

    return (
        <div className={s.root}>
            <h1>This is Game Page!!!!</h1>
            <button onClick={ handlerBackHome } >Back Home Page</button>
        </div>
    );
};