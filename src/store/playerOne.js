import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'playerOne',
    initialState: {
        isLoadingPlayerOne: true,
        data: {},
    },
    reducers: {
        setPlayerOne: ( state, action ) => ({
            ...state,
            isLoadingPlayerOne: false,
            data: action.payload
        })
    }
})

export const { setPlayerOne } = slice.actions;

export const playerOneLoading = state => state.playerOne.data;
export const selectPlayerOne = state => state.playerOne.data;

export default slice.reducer;