import React, { useEffect } from 'react';
import styles from './UserBookings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../features/BookingsSlice';
import UserBooking from '../../components/UserBooking/UserBooking';
import { Link } from 'react-router-dom';
export default function UserBookings() {
  const { bookingsUser } = useSelector((state) => state.bookings);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <div className={styles.navMenu}>
        <div className={styles.nav}>
          <Link className={styles.link} to={'userplays'}>
            Plays
          </Link>
          <Link className={styles.link} to={'userbookings'}>
            Bookings
          </Link>
        </div>
        <div>
          <div>Admin</div>
        </div>
      </div>
      <div className={styles.bookingContainer}>
        <div className={styles.size}>
          <h3>Play name</h3>
        </div>

        <div className={styles.size}>
          <h3>Tickets count</h3>
        </div>
        <div className={styles.size}>
          <h3>Booked date</h3>
        </div>
        <div className={styles.size}>
          <h3>Play date</h3>
        </div>
        <div className={styles.size}>
          <h3>Status</h3>
        </div>
      </div>
      {bookingsUser?.length &&
        bookingsUser.map((book) => {
          return <UserBooking key={book.bookingId} {...book} />;
        })}
    </div>
  );
}
