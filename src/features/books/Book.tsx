import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { BookTransactions } from './Transactions';
import { makeSelectUsersOfBook, addUser } from './usersSlice';
import UserComp from './User';

export default function Book({ bookId }: { bookId: string }) {

  const selectUsersOfBook = useMemo(makeSelectUsersOfBook, []);

  const users = useSelector((state: RootState) => selectUsersOfBook(state, { bookId }));
  const dispatch = useDispatch();

  const addNewUser = (e: any) => {
    e.preventDefault();
    const name = e.target.userName.value.trim() as string;
    dispatch(addUser({
      name,
      bookId
    }));
  };

  return (
    <div className='book'>
      <div className='users'>
        {users.map(user => (
          <UserComp user={user} key={user.id} />
        ))}
      </div>
      <BookTransactions bookId={bookId} />
      <form onSubmit={addNewUser}>
        <input name='userName' placeholder='User Name *' required />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}