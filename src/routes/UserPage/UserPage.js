import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import s from './userPage.module.css';

export const UserPage = () => {
    const user = useSelector(selectUser);
    return (
        <section className={ s.section } >
            <div className={ s.container } >
                <div className={ s.row } >
                    <div className={ s.col } />
                    <div className={ s.colRight } >
                        <div className={ s.intro }>
                            <div className={ s.profileImg }>
                                <img src="" alt=""/>
                            </div>
                            <h2>
                                <b>
                                    
                                </b>
                            </h2>
                            <h4 className={ s.yellow }>
                                Email: 
                                { user.email }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}