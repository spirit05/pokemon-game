import s from './loading.module.css';

export const Loading = () => {
    return (
        <div className={ s.container }>
            <div className={ s.mainball }>
                <div className={ s.pokebutton } />
            </div>
        </div>
    )
}