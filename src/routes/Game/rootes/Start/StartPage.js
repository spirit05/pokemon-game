import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { Button } from "../../../../components/Button/Button";
import { Loading } from './component/Loading/Loading';

import { getPokemonsAsync, selectPokemonsData, selectPokemonsLoading } from '../../../../store/pokemon';
import { clearPlayerOne, playerOneLoading, setPlayerOne } from '../../../../store/playerOne';
import { getPlayerTwoAsync } from '../../../../store/playerTwo';

import s from './StartPage.module.css';

export const StartPage = () => { 
    const pokemonsRedux = useSelector(selectPokemonsData);
    const isLoadingPokemons = useSelector(selectPokemonsLoading);
    const isLoadingPlayerOne = useSelector(playerOneLoading);
    const dispatch = useDispatch();
    
    const [selectedCard, setSelectedCard] = useState({});
    const [ cards, setCards ] = useState({});

    const history = useHistory();

    const countSelectedPokemons = Object.keys(selectedCard).length;
    
    useEffect(() => {

        dispatch(getPokemonsAsync());
        dispatch(getPlayerTwoAsync());
        dispatch(clearPlayerOne());

        setSelectedCard({});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  

    useEffect(() => {

        setCards(pokemonsRedux);

    },[pokemonsRedux]);

    const handlerActiveSelected = (key) => {

        const pokemon = {...cards[key]};

        setSelectedCard(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }

            return {
                ...prevState, 
                [key]: pokemon
            };
        });

        setCards(prevState => (
            {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected,
                }
            }
        ));

    };

    const handlerStartGameClick = () => {

        dispatch(setPlayerOne(selectedCard));

        history.push('/game/board');
    }

    const randomPlayerOneCard = async () => {
        const copyCard = {...cards}
        const keys = Object.keys(copyCard);

        let player1 = {...selectedCard};

        for( let i = countSelectedPokemons; i < 5; i++) {
            let k = keys[Math.round(Math.random() * keys.length)];
            // let [ a, b ] = Object.entries(copyCard).find(([key]) => key === k );
            let item = Object.entries(copyCard).find(([key]) => key === k );
            player1 = ({
                ...player1,
                [`${item[0]}`]: item[1]
            })
        };

        await dispatch(setPlayerOne(player1));

        history.push('/game/board');
    };

    const handlerRandomCards = () => {

        randomPlayerOneCard();

    };

    return (
        <>
            <div className={s.root}>
                <div className={s.start} >
                <h1>Let's started!!!! Select 5 cards.</h1>
                {
                    isLoadingPokemons ? 
                    (
                        <Loading />
                    ) :
                    ''
                }
                <div className={s.flex}>
                    {
                        Object.entries(cards).map( 
                            ([key,{ id, name, img, type, values, selected }]) => (
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
                                /> 
                            )
                        )
                    }
                </div>
                </div>
                <div className={ s.selectedBox }>            
                    <div className={s.selectedPokemon}>
                        {
                            Object.entries(selectedCard).map( 
                                ([key,{ id, name, img, type, values, selected }]) => (
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
                                    /> 
                                )
                            )
                        }
                    </div>
                    {
                        countSelectedPokemons === 5 ? 
                        (
                            <Button 
                                cb={handlerStartGameClick}
                                className={ s.startBtn }
                                title={ 'Start game' }
                            />
                        ) :
                        (
                            <>
                                <h3>Selected pokemon { countSelectedPokemons }</h3>
                                <Button 
                                    cb={handlerRandomCards}
                                    className={ s.startBtn }
                                    title={ 'Random cards' }
                                    disabled={ isLoadingPokemons && isLoadingPlayerOne }
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};