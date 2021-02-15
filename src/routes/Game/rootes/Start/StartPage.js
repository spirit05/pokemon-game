import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { Button } from "../../../../components/Button/Button";

import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';


import s from './StartPage.module.css';

export const StartPage = () => { 
    const firebase = useContext(FireBaseContext);
    const pokemonContext = useContext(PokemonContext);
    const [ cards, setCards ] = useState({});
    const history = useHistory();

    const countSelectedPokemons = Object.keys(pokemonContext.pokemons).length;
    
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

    const handlerStartGameClick = () => {
        history.push('/game/board');
    }

    const handlerBackHome = () => {
        history.push('/');
    }

    return (
        <>
            <div className={s.root}>
                <div className={s.start} >
                <h1>Let's started!!!! Select 5 cards.</h1>
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
                                        if (countSelectedPokemons < 5 || selected) {
                                            handlerActiveSelected(key);
                                        } 
                                    }
                                }
                            /> ))
                    }
                </div>
                </div>
                <div className={ s.selectedBox }>            
                    <div className={s.selectedPokemon}>
                        {
                            Object.entries(pokemonContext.pokemons).map( ([key,{ id, name, img, type, values, selected }]) => (
                                <PokemonCard 
                                    className={ s.selectedCard }
                                    key={ key }
                                    name = { name }
                                    id = { id } 
                                    img = { img }
                                    type = { type }
                                    value = { false }
                                    values = { values }
                                    isActive = { true }
                                    minimize
                                    isSelected = { selected }
                                    onChangeCard = { () => { 
                                            if (countSelectedPokemons <= 5 || selected) {
                                                handlerActiveSelected(key);
                                            } 
                                        }
                                    }
                                /> ))
                        }
                    </div>
                    {
                        countSelectedPokemons === 5 ? 
                        (<Button 
                            cb={handlerStartGameClick}
                            className={ s.startBtn }
                            title={ 'Start game' }
                        />) :
                        (<>
                            <h3>Selected pokemon { countSelectedPokemons }</h3>
                            <Button 
                                cb={handlerBackHome}
                                className={ s.startBtn }
                                title={ 'Back Home Page' }
                            />
                        </>)
                    }
                </div>
            </div>
        </>
    );
};