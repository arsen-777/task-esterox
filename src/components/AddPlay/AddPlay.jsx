import React from 'react';
import styles from './AddPlay.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../features/PlaysSlice';
export default function AddPlay() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(toggleIsOpen());
  };
  return (
    <div className={styles.addPlay}>
      <button onClick={toggleModal}>+</button>
    </div>
  );
}
