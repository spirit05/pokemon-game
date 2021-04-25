import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemon';
import playerOneReducer from './playerOne';
import playerTwoReducer from './playerTwo';
import isLoginReducer from './isLogin';
import userReducer from './user';

export default configureStore( {
    reducer: {
        pokemons: pokemonsReducer,
        playerOne: playerOneReducer,
        playerTwo: playerTwoReducer,
        isLogin: isLoginReducer,
        user: userReducer,
    }
} )
