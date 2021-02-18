import { useState } from "react";

import PokemonCard from "../../../../../../components/PokemonCard/PokemonCard";

import cn from 'classnames';
import s from './playerBoard.module.css';

export const PlayerBoard = ({ player, cards, onClickCard, step }) => {
    const [ isSelected, setSelected ] = useState(null);
        
    return (
        <>
            {
                cards.map( 
                    ( item, index )  => (
                        <div 
                            key={ item.key || `${item.id}${index}` }
                            className={ cn(s.cardBoard, {
                                [s.selected]: isSelected === item.key || isSelected === item.id
                            }) }
                            onClick={ () => {
                                if (player === step) {
                                    setSelected(item.key || item.id);
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
                    )
                )
            }
        </>    
    )
};