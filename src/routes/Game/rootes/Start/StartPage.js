import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';

import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';


import s from './StartPage.module.css';

export const StartPage = () => { 
    const firebase = useContext(FireBaseContext);
    const pokemonContext = useContext(PokemonContext);
    const [ cards, setCards ] = useState({});

    // Используется в асинхронноном варианте с once
    // const getCards = async () => {
    //     const responce = await firebase.getCardsOnce();
    //     setCards(responce);    
    // };
    
    useEffect(() => {
        //С использованием soket
        firebase.getCardSoket( pokemons => {
            setCards(pokemons);
        });

        pokemonContext.onClearSelectedCard();

        // Отписываемся от подписки на событие, т.к. мы не передаем второй аргумент useEffect, то отписка сработает когда компонент будет размотнирован
        return () => firebase.ofCardSoket();
        
        // Асинхронный вариант с once
        // getCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  

    const history = useHistory();

    const handlerActiveSelected = (key) => {
        const pokemon = {...cards[key]};

        pokemonContext.onSelectedPokemons(key, pokemon);

        setCards(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    };

    const handlerBackHome = () => {
        history.push('/');
    }

    const handlerStartGameClick = () => {
        history.push('/game/board');
    }

    return (
        <>
            <div className={s.root}>
                <h1>Let's started!!!!</h1>
                <button 
                    onClick = { handlerStartGameClick }
                    disabled = { Object.keys(pokemonContext.pokemons).length < 5}
                >
                    Start game
                </button>
                <div className={s.flex}>
                    {
                        Object.entries(cards).map( ([key,{ id, name, img, type, values, selected }]) => (
                            <PokemonCard 
                                className={ s.card }
                                key={ key }
                                name = { name }
                                id = { id } 
                                img = { img }
                                type = { type }
                                values = { values }
                                isActive = { true }
                                isSelected = { selected }
                                onChangeCard = { () => { 
                                        if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                                            handlerActiveSelected(key);
                                        } 
                                    }
                                }
                            /> ))
                    }
                </div>
                <button onClick={ handlerBackHome } >Back Home Page</button>
            </div>
        </>
    );
};