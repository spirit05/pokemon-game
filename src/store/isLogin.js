import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'isLogin',
    initialState: {
        isLogin: true,
        title: 'Вход',
        btnValue: 'Войти',
    },
    reducers: {
        isRegister: (state, action) => ({
            ...state,
            isLogin: false,
            title: action.payload,
            btnValue: 'Отправить'
        }),
        changeIsLogin: (state, action) => ({
            ...state,
            isLogin: true,
            title: action.payload,
            btnValue: 'Войти'
        }),
    }
}) 

export const { changeIsLogin, isRegister, getUserEmail } = slice.actions;

export const selectIsLogin = state => state.isLogin.isLogin;
export const selectTitle = state => state.isLogin.title;
export const selectBtnValue = state => state.isLogin.btnValue;

export default slice.reducer;