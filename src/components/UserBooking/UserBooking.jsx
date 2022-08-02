import React, { useState } from 'react';
import styles from './UserBooking.module.scss';
export default function UserBooking({
  playName,
  ticketsCount,
  bookedDate,
  playDate,
  status,
}) {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className={styles.book}>
      <div className={styles.size}>
        <p>{playName}</p>
      </div>

      <div className={styles.size}>
        <p>{ticketsCount}</p>
      </div>
      <div className={styles.size}>
        <p>{bookedDate}</p>
      </div>
      <div className={styles.size}>
        <p>{playDate}</p>
      </div>
      <div className={styles.size}>
        <p>{status}</p>
      </div>
    </div>
  );
}
