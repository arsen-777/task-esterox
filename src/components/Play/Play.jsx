import React from 'react';
import styles from './Play.module.scss';

import del from '../../asets/images/delete.svg';
import edit from '../../asets/images/edit1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen, editMostBeEdited } from '../../features/PlaysSlice';

export default function Play({ id, title, image, date, time, seats }) {
  const dispatch = useDispatch();

  const handleModal = () => {
    console.log('handleModal', id);
    dispatch(toggleIsOpen());
    dispatch(editMostBeEdited({ id }));
  };

  return (
    <div>
      <div className={styles.titleBlock}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={styles.editBlock} onClick={() => handleModal(id)}>
          <img src={edit} alt="" />
        </div>
      </div>
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <p>{date}</p>
      </div>
      <div>
        <p>{time}</p>
      </div>
      <div>
        <p>available tickets{seats}</p>
      </div>
    </div>
  );
}
