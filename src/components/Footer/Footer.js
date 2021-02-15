import s from './footer.module.css';

const Footer = ({ active }) => {
    return (
        <footer className={ active ? s.hide : null}>
            <div className={s.wrapper}>
                <h3>THANKS FOR VISITING</h3>
                <p>© 2021 #ReactMarathon.</p>
            </div>
        </footer>
    )
}

export default Footer;