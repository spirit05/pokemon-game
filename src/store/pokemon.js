// чтобs использоввать одно из состояний нашего стора, мы должны использовать createSlice
import { createSlice } from '@reduxjs/toolkit';
import fireBaseClass from '../service/firebase';

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
})

export const { fetchPokemon, fetchPokemonResolve, fetchPokemonReject } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;

export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async dispatch => {
    dispatch(fetchPokemon());
    const data = await fireBaseClass.getCardsOnce();
    dispatch(fetchPokemonResolve(data));
}

export default slice.reducer;