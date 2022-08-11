import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookings } from '../../features/BookingsSlice';
import Loader from '../../components/Loader/Loader';
import UserBooking from '../../components/UserBooking/UserBooking';
import styles from './UserBookings.module.scss';
import user from '../../asets/images/user.svg';
export default function UserBookings() {
  const { users } = useSelector((state) => state.users);
  const email = users[0]?.email;
  const { bookingsUser, isLoading } = useSelector((state) => state.bookings);
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
          <div className={styles.userBlock}>
            <div>
              <img src={user} alt="" />
            </div>
            <div>{email}</div>
          </div>
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

///

// "@date-io/date-fns": "^2.15.0",
//     "@emotion/react": "^11.10.0",
//     "@emotion/styled": "^11.10.0",
//     "@material-ui/core": "5.0.0-alpha.24",
//     "@material-ui/lab": "5.0.0-alpha.24",
//     "@mui/lab": "^5.0.0-alpha.94",
//     "@mui/material": "^5.10.0",
