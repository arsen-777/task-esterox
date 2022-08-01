import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import styles from './UserPlay.module.scss';
import { toggleIsOpen } from '../../features/PlaysSlice';
export default function UserPlay() {
  const dispatch = useDispatch();
  const allPlays = useSelector((state) => state.plays.allPlays);

  useEffect(() => {
    dispatch(fetchAllPlays());
  }, [dispatch]);

  return (
    <div className={styles.userPlay}>
      {allPlays.length > 0 &&
        allPlays.map((play) => {
          return <Play key={play.id} {...play} />;
        })}
    </div>
  );
}
