import {configureStore} from "@reduxjs/toolkit";
import {mockApi} from "./mockApi.ts";
import { userFormReducer } from "../../features/UserForm/model/slice/userFormSlice.ts";


export const store = configureStore({
    reducer: {
        [ mockApi.reducerPath]: mockApi.reducer,
        userForm: userFormReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockApi.middleware)
});