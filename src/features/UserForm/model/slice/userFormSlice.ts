import {createSlice} from '@reduxjs/toolkit/react';
import type {PayloadAction} from '@reduxjs/toolkit';

interface UserFormState {
    open: boolean;
    name: string;
    avatar: string;
    details: string;
    id: string;
}

const initialState: UserFormState = {
    open: false,
    name: '',
    avatar: '',
    details: '',
    id: ''
};

const userFormSlice = createSlice({
    name: 'userForm',
    initialState,
    reducers: {
        openForm: (state) => {
            state.open = true;
        },
        closeForm: (state) => {
            state.open = false;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload;
        },
        setDetails: (state, action: PayloadAction<string>) => {
            state.details = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        resetForm: (state) => {
            state.name = '';
            state.avatar = '';
            state.details = '';
            state.id = '';
        },
    },
});

export const userFormActions = userFormSlice.actions;
export const userFormSelectors = {
    formState: (state: { userForm: UserFormState }) => state.userForm,
};
export const userFormReducer = userFormSlice.reducer;
