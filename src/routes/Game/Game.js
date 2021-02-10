import { useRouteMatch, Route, Switch } from "react-router-dom";

import { useEffect, useState } from "react";

import { PokemonContext } from "../../context/pokemonContext";

import { StartPage } from './rootes/Start/StartPage';
import { BoardPage } from './rootes/Board/BoardPage';
import { FinishPage } from './rootes/Finish/FinishPage';

export const GamePage = () => {
    const [selectedCard, setSelectedCard] = useState({});

    const match = useRouteMatch();

    const handlerSelectedPokemons = (key, pokemon) => {
        setSelectedCard(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }

            return {
                ...prevState, 
                [key]: pokemon
            }
        })       
    }

    const clearSelectedCard = () => {
        setSelectedCard(prevState => {
            let copyState = {...prevState};

            copyState = {};
            
            return copyState;
        })
    }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedCard,
            onSelectedPokemons: handlerSelectedPokemons,
            onClearSelectedCard: clearSelectedCard
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}  />
                <Route path={`${match.path}/board`} component={BoardPage} / >
                <Route path={`${match.path}/finish`} component= {FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};