import { useState } from 'react';
import { useHistory } from "react-router-dom";
import PokemonCard from '../../components/PokemonCard/PokemonCard';

import POKEMONS from '../../pokemons.json';

import s from './game.module.css';

const arr = JSON.parse(JSON.stringify(POKEMONS));

export const GamePage = () => {

    const [ card, setCard ] = useState(arr);

    const history = useHistory();

    const handlerClick = (cardId) => {
        setCard( prevState => {
            prevState.map( item => {
                if(item.id === cardId) item.active = true;
                return item;
            });
        return [...prevState];
        })
    }  

    const handlerBackHome = () => {
        history.push('/');
    }

    return (
        <>
            <div className={s.root}>
                <h1>Let's started!!!!</h1>
                <div className={s.flex}>
                    {
                        card.map( item => (
                            <PokemonCard 
                                key={ item.id }
                                name = { item.name }
                                id = { item.id } 
                                img = { item.img }
                                type = { item.type }
                                values = { item.values }
                                isActive = { item.active }
                                onChangeCard = { handlerClick }
                            /> ))
                    }
                </div>
                <button onClick={ handlerBackHome } >Back Home Page</button>
            </div>
        </>
    );
};