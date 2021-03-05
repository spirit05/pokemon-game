import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'isLogin',
    initialState: {
        value: true,
        title: 'Вход',
        btnValue: 'Войти',
    },
    reducers: {
        isRegister: (state, action) => ({
            ...state,
            value: false,
            title: action.payload,
            btnValue: 'Отправить'
        }),
        changeIsLogin: (state, action) => ({
            ...state,
            value: true,
            title: action.payload,
            btnValue: 'Войти'
        }),
    }
}) 

export const { changeIsLogin, isRegister, getUserEmail } = slice.actions;

export const selectIsLogin = state => state.isLogin.value;
export const selectTitle = state => state.isLogin.title;
export const selectBtnValue = state => state.isLogin.btnValue;

export default slice.reducer;