import React, { useEffect } from 'react';
import styles from './AdminBookings.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBookings } from '../../features/BookingsSlice';
import Booking from '../../components/Booking/Booking';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import useAuth from '../../components/hooks/useAuth';
import AdminNav from "../../components/AdminNav/AdminNav";

export default function AdminBookings() {
  const dispatch = useDispatch();
  const user = useAuth();
  const { bookingsAdmin, isLoading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchAllBookings(user?.uid));
  }, [dispatch, user?.uid]);

  return (
    <>
    <div className={styles.adminContainer}>
      <AdminNav/>
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
        {bookingsAdmin &&
          bookingsAdmin.map((book) => {
            return <Booking key={book.key} {...book} />;
          })}
        {isLoading && (
          <div className={styles.loader}>
            <div className={styles.loader}>
              <Loader />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
