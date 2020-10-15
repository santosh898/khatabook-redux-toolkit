import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TransactionsState, UsersState } from '../../app/types';
import { nanoid } from 'nanoid'

const initialState: TransactionsState = [];

type UserPayload = {
  notes: string,
  bookId: string,
  userId: string,
  amount: number
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (transactions, action: PayloadAction<UserPayload>) => {
      transactions.push({
        id: nanoid(),
        ...action.payload
      });
    },
  }
});

export const { addTransaction } = transactionsSlice.actions;

export const getTransactionsOfBook = (
  { transactions, users }: { transactions: TransactionsState, users: UsersState }
  , bookId: string) => {
  const filtered = transactions.filter(transaction => transaction.bookId === bookId);
  return filtered.map(t => ({ ...t, userName: users.find(u => u.id === t.userId)?.name }));
};

export const getTransactionsOfUserInBook = (transactions: TransactionsState, { bookId, userId }: { bookId: string, userId: string }) => {
  return transactions.filter(transaction => transaction.bookId === bookId && transaction.userId === userId);
};

export const makeSelectTransactionsOfBook = () => createSelector(
  (state: RootState) => ({ transactions: state.transactions, users: state.users }),
  (_: RootState, bookId: string) => bookId,
  getTransactionsOfBook
);

export const makeSelectTransactionsOfUserInBook = () => createSelector(
  (state: RootState) => state.transactions,
  (_: RootState, { bookId, userId }: { bookId: string, userId: string }) => ({ bookId, userId }),
  getTransactionsOfUserInBook
);

export default transactionsSlice.reducer;
