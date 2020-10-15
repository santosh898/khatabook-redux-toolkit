export interface Transaction {
    id: string,
    amount: number,
    notes: string,
    userId: string,
    bookId: string,
    userName?: string
}

export interface User {
    id: string,
    name: string,
    bookId: string
}

export interface Book {
    id: string,
    name: string
}

export type BooksState = Book[];

export type UsersState = User[];

export type TransactionsState = Transaction[];