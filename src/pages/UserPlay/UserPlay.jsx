import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import styles from './UserPlay.module.scss';
import { Link } from 'react-router-dom';
import { toggleIsUser } from '../../features/usersSlice';
export default function UserPlay() {
  const dispatch = useDispatch();
  const allPlays = useSelector((state) => state.plays.allPlays);
  const { users } = useSelector((state) => state.users);
  const email = users[0]?.email;

  useEffect(() => {
    dispatch(fetchAllPlays());
    dispatch(toggleIsUser());
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
          {allPlays.length > 0 &&
            allPlays.map((play) => {
              return <Play key={play.id} {...play} />;
            })}
        </div>
      </div>
    </>
  );
}
