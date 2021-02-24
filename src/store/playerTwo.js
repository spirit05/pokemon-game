// чтобs использоввать одно из состояний нашего стора, мы должны использовать createSlice
import { createSlice } from '@reduxjs/toolkit';

import fetchGitClass from '../service/fetchGit';

export const slice = createSlice({
    name: 'playerTwo',
    initialState: {
        isLoading: false,
        data: [],
        error: null,
    },
    reducers: {
        fetchPlayerTwo: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPlayerTwoResolve: ( state, action ) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }),
        fetchPlayerTwoReject: ( state, action ) => ({
            ...state,
            isLoading: false,
            data: [],
            error: action.payload
        })
    }
})

export const { fetchPlayerTwo, fetchPlayerTwoResolve, fetchPlayerTwoReject } = slice.actions;

export const selectPlayerTwo = state => state.playerTwo.data;

export const getPlayerTwoAsync = () => async dispatch => {
    dispatch(fetchPlayerTwo());

    const data = await fetchGitClass.getPlayer2Card().then(response => {
            return response.map( item => ({
                    ...item,
                    possession: 'red',
                }));
            } );

    dispatch(fetchPlayerTwoResolve(data));
};

export default slice.reducer;