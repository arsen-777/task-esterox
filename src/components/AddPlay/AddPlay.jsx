import React from 'react';
import styles from './AddPlay.module.scss';
import add from '../../asets/images/add.svg';
import { useSelector, useDispatch } from 'react-redux';
import { toggleIsOpen } from '../../features/PlaysSlice';
export default function AddPlay() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(toggleIsOpen());
  };
  return (
    <div className={styles.addPlay} onClick={toggleModal}>
      <img src={add} alt="" />
    </div>
  );
}
