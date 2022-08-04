import React, { useEffect } from 'react';
import styles from './AdminPlays.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import AddPlay from '../../components/AddPlay/AddPlay';
import { toggleIsUser } from '../../features/usersSlice';
import { Link } from 'react-router-dom';
export default function AdminPlays() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPlays());
    dispatch(toggleIsUser());
  }, [dispatch]);

  const { allPlays } = useSelector((state) => state.plays);
  return (
    <div>
      <div className={styles.adminContainer}>
        <div className={styles.adminNav}>
          <div className={styles.links}>
            <Link className={styles.link} to="/adminplays">
              Plays
            </Link>
            <Link className={styles.link} to="/adminbookings">
              Bookings
            </Link>
          </div>
          <div>
            <p>Admin</p>
          </div>
        </div>
      </div>

      <div className={styles.playsBlock}>
        <div className={styles.playsContainer}>
          {allPlays?.length > 0 &&
            allPlays.map((play) => {
              return <Play key={play.key} {...play} />;
            })}

          <AddPlay />
        </div>
      </div>
    </div>
  );
}
