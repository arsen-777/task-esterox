import React from 'react';
import styles from './Booking.module.scss';
import { useDispatch } from 'react-redux';
import { fetchUpdateStatus } from '../../features/BookingsSlice';
import uuid from 'react-uuid';

export default function Booking({
  bookedDate,
  email,
  playName,
  status,
  ticketsCount,
  username,
  id,
  playDate,
  bookingId,
}) {
  const dispatch = useDispatch();
  const updateStatus = (status) => {
    const updatedBook = {
      bookedDate,
      email,
      id,
      playDate,
      ticketsCount,
      username,
      status: status,
      bookingId,
      playName,
      key: uuid(),
    };
    try {
      dispatch(fetchUpdateStatus({ obj: updatedBook, id: id }));
    } catch (error) {
      console.log('error in catch');
    }
  };
  return (
    <div className={styles.book}>
      <div className={styles.size}>
        <p>{playName}</p>
      </div>
      <div className={styles.size}>
        <p>{username}</p>
      </div>
      <div className={styles.size}>
        <p>{email}</p>
      </div>
      <div className={styles.size}>
        <p>{ticketsCount}</p>
      </div>
      <div className={styles.size}>
        <p>{bookedDate}</p>
      </div>
      <div className={styles.size}>
        {status === 'Approved' || status === 'Reject' ? (
          <p
            style={
              status === 'Approved' ? { color: 'green' } : { color: 'red' }
            }
          >
            {status}
          </p>
        ) : (
          <>
            <button
              onClick={() => updateStatus('Approved')}
              className={styles.btnApprove}
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus('Reject')}
              className={styles.btnReject}
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}
