import cn from 'classnames';

import s from './layout.module.css';

const Layout = ({ id, title, urlBg = false, colorBg = false, children}) => {
    
    const styleBg = {};
    
    if(urlBg) { styleBg.backgroundImage = `url("${urlBg}")` };
    if(colorBg) { styleBg.background = `${colorBg}` };

    return (
        <section className={ s.root } style={ styleBg } id={ id }>
            <div className={ s.wrapper }>
                <article>
                    <div className={ s.title }>
                        <h3>{ title }</h3>
                        <span className={ s.separator }></span>
                    </div>
                    <div className={ cn( s.desc, s.full) }>
                        { children }
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;

