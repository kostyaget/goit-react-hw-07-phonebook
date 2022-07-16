import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,FLUSH,
    REHYDRATE,PAUSE,
    PERSIST,PURGE,
    REGISTER,
} from 'redux-persist'
import { persistedContactsReducer } from './contacts/slice';
import { filterSlice } from './filter/slice';

export const store = configureStore ({
    reducer: {
        contacts: persistedContactsReducer,
        filter: filterSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});

export const persistor = persistStore(store);