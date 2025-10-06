import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {mockApi} from "./mockApi.ts";
import {userFormReducer} from "../../features/UserForm/model/slice/userFormSlice.ts";
import storage from 'redux-persist/lib/storage'
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const rootReducer = combineReducers({
    [mockApi.reducerPath]: mockApi.reducer,
    userForm: userFormReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [mockApi.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(mockApi.middleware),
});

export const persistor = persistStore(store);