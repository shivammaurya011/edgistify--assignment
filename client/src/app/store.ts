import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import categoriesReducer from '../features/categoriesSlice';
import productReducer from '../features/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      devTools: true
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;