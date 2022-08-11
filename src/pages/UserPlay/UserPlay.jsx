import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import { fetchBookings } from '../../features/BookingsSlice';
import { toggleIsUser } from '../../features/usersSlice';
import styles from './UserPlay.module.scss';

export default function UserPlay() {
  const dispatch = useDispatch();
  const { allPlays } = useSelector((state) => state.plays);
  const { isLoading } = useSelector((state) => state.plays);

  const { users } = useSelector((state) => state.users);
  const email = users[0]?.email;
  useEffect(() => {
    dispatch(fetchAllPlays());
    dispatch(toggleIsUser(true));
    dispatch(fetchBookings({ id: users[0]?.id }));
  }, [dispatch, users]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navMenu}>
          <Link to={'/userplay'} className={styles.link}>
            Play
          </Link>
          <Link to={'/userbookings'} className={styles.link}>
            Bookings
          </Link>
        </div>
        <div>
          <p>
            User/ <span>{email}</span>
          </p>
        </div>
      </div>
      <div className={styles.playsBlock}>
        <div className={styles.userPlay}>
          {isLoading ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            allPlays.length > 0 &&
            allPlays.map((play) => {
              return <Play key={play.id} {...play} />;
            })
          )}
        </div>
      </div>
    </>
  );
}
