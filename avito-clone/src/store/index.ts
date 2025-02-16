import { configureStore } from '@reduxjs/toolkit';
import adsReducer from './slices/adsSlice';

export const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

store.subscribe(() => {
  console.log('Store изменился:', store.getState());
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
