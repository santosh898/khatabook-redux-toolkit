import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import transactionsReducer from '../features/books/transactionsSlice';
import usersReducer from '../features/books/usersSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
    transactions: transactionsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
