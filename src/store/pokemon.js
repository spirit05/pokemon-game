// чтобs coздать одно из состояний нашего стора, мы должны использовать createSlice
import { createSlice } from '@reduxjs/toolkit';

import { selectLocalId } from './user';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemon: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonResolve: ( state, action ) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }),
        fetchPokemonReject: ( state, action ) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload
        })
    }
});

export const { fetchPokemon, fetchPokemonResolve, fetchPokemonReject } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;

export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalId(getState());
    const idToken = localStorage.getItem('idToken');

    dispatch(fetchPokemon());

    const data = await fetch(`https://pokemon-game-3922e-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`).then(res => res.json());

    dispatch(fetchPokemonResolve(data));
};

export default slice.reducer;