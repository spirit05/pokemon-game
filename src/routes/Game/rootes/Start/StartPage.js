import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { Button } from "../../../../components/Button/Button";

import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync, selectPokemonsData, selectPokemonsLoading } from '../../../../store/pokemon';
import { setPlayerOne } from '../../../../store/playerOne';
import { getPlayerTwoAsync } from '../../../../store/playerTwo';

import s from './StartPage.module.css';
import { Loading } from './component/Loading/Loading';

export const StartPage = () => { 
    const pokemonsRedux = useSelector(selectPokemonsData);
    const isLoading = useSelector(selectPokemonsLoading);
    const dispatch = useDispatch();
    
    const [selectedCard, setSelectedCard] = useState({});
    const [ cards, setCards ] = useState({});

    const history = useHistory();

    const countSelectedPokemons = Object.keys(selectedCard).length;
    
    useEffect(() => {
        dispatch(getPokemonsAsync());
        dispatch(getPlayerTwoAsync())

        dispatch(setPlayerOne({}));
        setSelectedCard({});



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  

    useEffect(() => {
        setCards(pokemonsRedux);
    },[pokemonsRedux])

    const handlerActiveSelected = (key) => {
        const pokemon = {...cards[key]};

        setSelectedCard(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            };

            return {
                ...prevState, 
                [key]: pokemon
            };
        });

        setCards(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    };

    const handlerStartGameClick = () => {
        dispatch(setPlayerOne(selectedCard));
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
                {
                    isLoading ? 
                    (
                        <Loading />
                    ) :
                    ''
                }
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
                            Object.entries(selectedCard).map( ([key,{ id, name, img, type, values, selected }]) => (
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