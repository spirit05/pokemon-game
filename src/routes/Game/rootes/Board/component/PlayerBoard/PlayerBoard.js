import { useState } from "react";

import PokemonCard from "../../../../../../components/PokemonCard/PokemonCard";

import cn from 'classnames';
import s from './playerBoard.module.css';

const i = {};

export const PlayerBoard = ({ player, cards, onClickCard }) => {
    const [ isSelected, setSelected ] = useState(null);
    i[player] = cards.length;    
    
    return (
        <>
            {
                cards.map( ( item, index )  => (
                    <div 
                        key={ item.key || `${item.id}${index}` }
                        className={ cn(s.cardBoard, {
                            [s.selected]: isSelected === item.id
                        }) }
                        onClick={ () => {
                            if (item.possession === (i[1] === i[2] ? 'blue' : 'red')) {
                                setSelected(item.id);
                                onClickCard && onClickCard( {
                                    player,
                                    ...item
                                });
                            }
                        }}

                    >
                        <PokemonCard 
                            className={ s.card }
                            name = { item.name }
                            id = { item.id } 
                            img = { item.img }
                            type = { item.type }
                            values = { item.values }
                            minimize
                            isActive
                        /> 
                    </div>
                ))
            }
        </>    
    )
}