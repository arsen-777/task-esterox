import React, { useEffect } from 'react';
import styles from './AdminPlays.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Play from '../../components/Play/Play';
import { fetchAllPlays } from '../../features/PlaysSlice';
import AddPlay from '../../components/AddPlay/AddPlay';
export default function AdminPlays() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPlays());
  }, [dispatch]);

  const allPlays = useSelector((state) => state.plays.allPlays);
  // console.log(typeof allPlays, 'all plays');
  return (
    <div className={styles.playsBlock}>
      <div className={styles.playsContainer}>
        {allPlays.length > 0 &&
          allPlays.map((play) => {
            return <Play key={play.id} {...play} />;
          })}
      </div>
      <div>
        <AddPlay />
      </div>
    </div>
  );
}
