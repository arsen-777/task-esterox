import React, { useEffect } from 'react';
import styles from './AdminBookings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../features/BookingsSlice';
import Booking from '../../components/Booking/Booking';
import { Link } from 'react-router-dom';
export default function AdminBookings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  const { bookingsAdmin } = useSelector((state) => state.bookings);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navMenu}>
          <Link to={'/adminplays'} className={styles.link}>
            Play
          </Link>
          <Link to={'/adminbookings'} className={styles.link}>
            Bookings
          </Link>
        </div>
        <div>
          <p>Admin</p>
        </div>
      </div>
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
            return <Booking key={book.bookingId} {...book} />;
          })}
      </div>
    </>
  );
}
