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
            isLoadingPlayerOne: true,
            data: action.payload
        }),
        clearPlayerOne: ( state ) => ({
            ...state,
            isLoadingPlayerOne: true,
            data: {}
        })
    }
})

export const { setPlayerOne, clearPlayerOne } = slice.actions;

export const playerOneLoading = state => state.playerOne.data;
export const playerOne = state => state.playerOne.data;

export default slice.reducer;