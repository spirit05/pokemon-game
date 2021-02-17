import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'playerOne',
    initialState: {
        data: {},
    },
    reducers: {
        setPlayerOne: ( state, action ) => ({
            ...state,
            data: action.payload
        }),
    }
})

export const { setPlayerOne } = slice.actions;

export const playerOne = state => state.playerOne.data;

export default slice.reducer;