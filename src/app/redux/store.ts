import {configureStore} from "@reduxjs/toolkit";
import {mockApi} from "./mockApi.ts";


export const store = configureStore({
    reducer: {
        [ mockApi.reducerPath]: mockApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockApi.middleware)
});