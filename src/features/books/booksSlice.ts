import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BooksState } from '../../app/types';
import { nanoid } from 'nanoid';


const initialState: BooksState = [];

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (books, action: PayloadAction<string>) => {
            books.push({
                id: nanoid(),
                name: action.payload
            });
        },
    }
})

export const { addBook } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books;

export default booksSlice.reducer;