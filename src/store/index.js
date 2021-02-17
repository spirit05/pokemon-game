import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import pokemonsReducer from './pokemon';
import playerOneReducer from './playerOne';
import playerTwoReducer from './playerTwo';

export default configureStore( {
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
        playerOne: playerOneReducer,
        playerTwo: playerTwoReducer,
    }
} )
