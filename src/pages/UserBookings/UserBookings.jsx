import React, { useEffect } from 'react';
import styles from './UserBookings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../features/BookingsSlice';
import UserBooking from '../../components/UserBooking/UserBooking';
import { Link } from 'react-router-dom';
import spinner from '../../asets/images/loader.svg';
import Loader from '../../components/Loader/Loader';
export default function UserBookings() {
  const { users } = useSelector((state) => state.users);
  // const { id } = users[0];
  const email = users[0]?.email;
  const { bookingsUser, isLoading } = useSelector((state) => state.bookings);
  console.log(isLoading, '-------------');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings({ id: users[0]?.id }));
  }, [dispatch, users]);
  return (
    <div className={styles.container}>
      <div className={styles.navMenu}>
        <div className={styles.nav}>
          <Link className={styles.link} to={'/userplay'}>
            Plays
          </Link>
          <Link className={styles.link} to={'/userbookings'}>
            Bookings
          </Link>
        </div>
        <div>
          <div>{email}</div>
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
      {bookingsUser &&
        bookingsUser.map((book) => {
          return <UserBooking key={book.playId} {...book} />;
        })}
      {isLoading && (
        <div className={styles.loader}>
          <div>
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}
