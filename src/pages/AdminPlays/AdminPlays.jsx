import React, { useEffect } from 'react';
import styles from './AdminPlays.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import AddPlay from '../../components/AddPlay/AddPlay';
import { toggleIsUser } from '../../features/usersSlice';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
export default function AdminPlays() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPlays());
    dispatch(toggleIsUser(false));
    // dispatch(toggleIsUser());
  }, [dispatch]);

  const { allPlays, isLoading } = useSelector((state) => state.plays);
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
              return <Play key={play.id} {...play} />;
            })}
          {isLoading && (
            <div className={styles.loader}>
              <div>
                <Loader />
              </div>
            </div>
          )}
          {!isLoading && <AddPlay />}
        </div>
      </div>
    </div>
  );
}
