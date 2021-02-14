import { useRouteMatch, Route, Switch } from "react-router-dom";

import { useContext, useEffect, useState } from "react";

import { PokemonContext } from "../../context/pokemonContext";
import { FetchGitContext } from "../../context/fetchGitContext";

import { StartPage } from './rootes/Start/StartPage';
import { BoardPage } from './rootes/Board/BoardPage';
import { FinishPage } from './rootes/Finish/FinishPage';

const getPlayer2 = ( git, setPlayer2 ) => {
    git.getPlayer2Card().then(data => {
        setPlayer2( () => {
            return data.map( item => ({
                    ...item,
                    possession: 'red',
                }));
            } );
    });
}

export const GamePage = () => {
    const git = useContext(FetchGitContext);
    const [selectedCard, setSelectedCard] = useState({});
    const [ player2, setPlayer2] = useState([]);
    const [ statusGame, setStatusGame ] = useState(null);

    useEffect(() => {
        getPlayer2(git, setPlayer2);
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
        getPlayer2(git, setPlayer2);
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