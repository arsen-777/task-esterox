import React, { useEffect } from 'react';
import styles from './AdminBookings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../features/BookingsSlice';
import Booking from '../../components/Booking/Booking';

export default function AdminBookings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  const { bookingsAdmin } = useSelector((state) => state.bookings);
  // console.log(bookingsAdmin, 'bookingsAdminbookingsAdminbookingsAdmin');
  return (
    <div>
      <div className={styles.bookingContainer}>
        <div className={styles.size}>
          <h3>Play name</h3>
        </div>
        <div className={styles.size}>
          <h3>Spectator name</h3>
        </div>
        <div className={styles.size}>
          <h3>Spectator email</h3>
        </div>
        <div className={styles.size}>
          <h3>Tickets count</h3>
        </div>
        <div className={styles.size}>
          <h3>Booked date</h3>
        </div>
        <div className={styles.size}>
          <h3>Status</h3>
        </div>
      </div>
      {bookingsAdmin?.length &&
        bookingsAdmin.map((book) => {
          return <Booking {...book} />;
        })}
    </div>
  );
}
