import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../app/types';
import { addTransaction, makeSelectTransactionsOfUserInBook } from './transactionsSlice';

type UserProps = {
  user: User,
}

export default function UserComp({ user }: UserProps) {

  const dispatch = useDispatch();
  const selectTransactionsOfUserInBook = useMemo(makeSelectTransactionsOfUserInBook, []);

  const transactions = useSelector((state: RootState) => selectTransactionsOfUserInBook(state,
    { userId: user.id, bookId: user.bookId }));

  const totalDebt = useMemo(() => {
    return transactions.reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const addNewTransaction = (e: any) => {
    e.preventDefault();
    const notes = e.target.notes.value.trim();
    const amount = parseInt(e.target.amount.value);
    dispatch(addTransaction({
      notes, bookId: user.bookId, userId: user.id, amount
    }));
  };

  return (
    <div className='add-transaction'>
      <h3>{user.name}</h3>
      Total Debt: {totalDebt}
      <form onSubmit={addNewTransaction}>
        <input name='notes' placeholder='Notes *' required />
        <input name='amount' type='number' placeholder='Amount *' required />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}