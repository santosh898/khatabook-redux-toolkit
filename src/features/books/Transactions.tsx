import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { makeSelectTransactionsOfBook, makeSelectTransactionsOfUserInBook } from './transactionsSlice';

type UserTransactionsPropsType = {
  bookId: string,
  userId: string
}

export function UserTransactions({ bookId, userId }: UserTransactionsPropsType) {

  const selectTransactionsOfUserInBook = useMemo(makeSelectTransactionsOfUserInBook, []);

  const transactions = useSelector((state: RootState) => selectTransactionsOfUserInBook(state, { bookId, userId }))

  return (
    <div className='transactions'>
      {transactions.map(transaction => {
        const { notes, amount } = transaction;
        return <div>
          {notes} - {amount}
        </div>
      })}
    </div>
  );
}

type BookTransactionsPropsType = {
  bookId: string,
}

export function BookTransactions({ bookId }: BookTransactionsPropsType) {

  const selectTransactionsOfUserInBook = useMemo(makeSelectTransactionsOfBook, []);

  const transactions = useSelector((state: RootState) => selectTransactionsOfUserInBook(state, bookId))

  return (
    <div className='transactions'>
      {transactions.map(transaction => {
        const { notes, amount, userName } = transaction;
        return <div key={transaction.id}>
          {notes} - {amount} from {userName}
        </div>
      })}
    </div>
  );
}