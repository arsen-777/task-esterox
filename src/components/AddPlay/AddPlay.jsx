import React from 'react';
import styles from './AddPlay.module.scss';
import add from '../../asets/images/add.svg';
import { useDispatch } from 'react-redux';
import { toggleIsOpen, addMessage } from '../../features/PlaysSlice';
export default function AddPlay() {
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(toggleIsOpen());
    dispatch(addMessage('Add New play'));
  };

  return (
    <div className={styles.addPlay} onClick={toggleModal}>
      <img src={add} alt="" />
    </div>
  );
}
