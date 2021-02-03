import { Link } from 'react-router-dom';

import s from './notfound.module.css';

export const NotFound = () => {
    return (
        <div className={s.root}>
            <h1>SORRY</h1>
            <h2>we couldn't find that page</h2>
            <h3>
                <Link to='/'>
                    Go to home page
                </Link>
            </h3>
        </div>
    )
}