import s from './style.module.css';

const Layout = ({ id, title, descr, urlBg, colorBg}) => {
    const { desc, full } = s;

    const styleBg = urlBg ? { backgroundImage: `url("${urlBg}")` } : { background: `${colorBg}`};

    return (
        <section className={s.root} style={styleBg} id={id}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>{ title }</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={ desc + full }>
                        <p>{ descr }</p>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;

