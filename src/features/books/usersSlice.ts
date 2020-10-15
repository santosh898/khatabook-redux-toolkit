import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UsersState } from '../../app/types';
import { nanoid } from 'nanoid';

const initialState: UsersState = [];

type UserPayload = {
  name: string,
  bookId: string
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (users, action: PayloadAction<UserPayload>) => {
      users.push({
        id: nanoid(),
        name: action.payload.name,
        bookId: action.payload.bookId
      });
    },
  }
});

export const { addUser } = usersSlice.actions;

export const getUersOfBook = (users: UsersState, bookId: string) => {
  return users.filter(user => user.bookId === bookId);
};

export const makeSelectUsersOfBook = () => createSelector(
  (state: RootState) => state.users,
  (_: any, { bookId }: { bookId: string }) => bookId,
  getUersOfBook
)

export default usersSlice.reducer;
