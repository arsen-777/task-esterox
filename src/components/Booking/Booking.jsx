import React, { useState } from 'react';
import styles from './Booking.module.scss';
export default function Booking({
  bookedDate,
  email,
  playName,
  status,
  ticketsCount,
  username,
}) {
  const [isApproved, setIsApproved] = useState(false);
  const handleApprove = () => {
    setIsApproved(true);
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
        {isApproved ? (
          <p className={styles.approved}>Approved</p>
        ) : (
          <>
            <button onClick={handleApprove} className={styles.btnApprove}>
              Approve
            </button>
            <button className={styles.btnReject}>Reject</button>
          </>
        )}
      </div>
    </div>
  );
}
