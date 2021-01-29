import s from './style.module.css';

const Header = ({ title, descr}) => {
    return (
        <>
            <div className={ s.forest }></div>
            <div className={ s.container }>
                <h1>{ title }</h1>
                <p>{ descr }</p>
            </div>
        </>
    )
}

export default Header;