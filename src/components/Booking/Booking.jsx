import React, { useState, useEffect } from 'react';
import styles from './Booking.module.scss';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateStatus } from '../../features/BookingsSlice';
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
  const [isApproved, setIsApproved] = useState(false);
  const [changedStatus, setChangedStatus] = useState('');
  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleStatus = () => {
    setChangedStatus('Approved');
  };

  // useEffect(() => {
  //   setIsApproved(true);
  // }, [status]);

  const updateStatus = () => {
    const updatedBook = {
      bookedDate,
      email,
      id,
      playDate,
      ticketsCount,
      username,
      status: 'Approved',
      bookingId,
    };
    try {
      dispatch(fetchUpdateStatus(updatedBook));
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
        {status === 'Approved' ? (
          <p className={styles.approved}>{status}</p>
        ) : (
          <>
            <button onClick={updateStatus} className={styles.btnApprove}>
              Approve
            </button>
            <button className={styles.btnReject}>Reject</button>
          </>
        )}
      </div>
    </div>
  );
}
