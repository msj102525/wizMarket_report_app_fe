import { configureStore } from '@reduxjs/toolkit';
import storeInfoReducer from '../slice/storeInfoSlice';

export const store = configureStore({
    reducer: {
        storeInfo: storeInfoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;