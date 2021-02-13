import { useRouteMatch, Route, Switch } from "react-router-dom";

import { useEffect, useState } from "react";

import { PokemonContext } from "../../context/pokemonContext";

import { StartPage } from './rootes/Start/StartPage';
import { BoardPage } from './rootes/Board/BoardPage';
import { FinishPage } from './rootes/Finish/FinishPage';

export const GamePage = () => {
    const [selectedCard, setSelectedCard] = useState({});
    const [ player2, setPlayer2] = useState([]);
    const [ statusGame, setStatusGame ] = useState(null);

    const getPlayer2Card = async () => {
        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();
        
        setPlayer2( () => {
            return player2Request.data.map( item => ({
                ...item,
                possession: 'red',
            }));
        } );
    };

    useEffect(() => {
        getPlayer2Card();
    }, []);

    const match = useRouteMatch();

    const handlerSelectedPokemons = (key, pokemon) => {
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
    };

    const clearSelectedCard = () => {
        setSelectedCard({});
        getPlayer2Card();
        setStatusGame(null);
    };

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedCard,
            player2Card: player2,
            statusGame: statusGame,
            onChangeStatusGame: setStatusGame,
            onSelectedPokemons: handlerSelectedPokemons,
            onClearSelectedCard: clearSelectedCard
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}  />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component= {FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};