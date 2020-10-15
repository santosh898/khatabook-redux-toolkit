import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from './Book';
import { addBook, selectBooks } from './booksSlice';

export default function Books() {

    const books = useSelector(selectBooks);
    const dispatch = useDispatch();

    const addNewBook = (e: any) => {
        e.preventDefault();
        dispatch(addBook(e.target.bookName.value));
    };

    return (
        <div>
            <h2>List Of Books</h2>
            <form onSubmit={addNewBook}>
                <input name='bookName' placeholder='Book Name *' required />
                <button type='submit'>Add Book</button>
            </form>
            {books.map((book) => (
                <div key={book.id}>
                    <span>{book.name}</span>
                    <Book bookId={book.id} />
                </div>
            ))}
        </div>
    );
}