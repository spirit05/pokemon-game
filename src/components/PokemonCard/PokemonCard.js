import cn from 'classnames';

import s from './pokemonCard.module.css';

const PokemonCard = ( { 
    name, 
    id, 
    img, 
    type, 
    value = true,
    values, 
    onChangeCard,
    minimize,
    className, 
    possession,
    isSelected = false,
    isActive = false
} ) => {

    const handlerClick = () => {
        onChangeCard && onChangeCard( id )
    }

    return (
        <div 
            className={cn(className, s.pokemonCard, {
                [s.active]: isActive,
                [s.selected]: isSelected
            })}
            onClick={ handlerClick }
        >
            <div className={s.cardFront}>
                <div className={cn(s.wrap, s.front)}>
                    <div className={cn(s.pokemon, s[type], s[possession])}>
                        <div className={cn({
                            [s.values]: value === true,
                            [s.selectValues]: value === false,
                        })}
                        >
                            <div className={cn(s.count, s.top)}>{values.top}</div>
                            <div className={cn(s.count, s.right)}>{values.right}</div>
                            <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                            <div className={cn(s.count, s.left)}>{values.left}</div>
                        </div>
                        <div className={cn({
                            [s.imgContainer]: value === true,
                            [s.selectimgContainer]: value === false,
                        })}
                        >
                            <img src={img} alt={name} />
                        </div>
                        { !minimize && (<div className={s.info}>
                            <span className={s.number}>#{id}</span>
                            <h3 className={s.name}>
                                {name}
                            </h3>
                            <small className={s.type}>
                                Type: <span>{type}</span>
                            </small>
                        </div>) }
                    </div>
                </div>
            </div>
                        
            <div className={s.cardBack}>
                <div className={cn(s.wrap, s.back)} />
            </div>
                        
        </div>
    )
}

export default PokemonCard;


