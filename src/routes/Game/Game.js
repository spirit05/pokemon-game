import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import { useState } from "react";

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
            };

            return {
                ...prevState, 
                [key]: pokemon
            };
        });      
    };

    const clearSelectedCard = () => {
        setSelectedCard(() => {
            return {};
        });
    };

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedCard,
            onSelectedPokemons: handlerSelectedPokemons,
            onClearSelectedCard: clearSelectedCard
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage}  />
                {/* <Route path={`${match.path}/board`} component={BoardPage} / > */}
                <Route path={`${match.path}/board`} render={() => {
                    if(Object.keys(selectedCard).length < 5) {
                        return <Redirect to='/game' />
                    }
                    return <BoardPage />
                }} / >
                <Route path={`${match.path}/finish`} component= {FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};