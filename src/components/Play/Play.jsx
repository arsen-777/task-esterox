import React, { useState, useEffect } from 'react';
import styles from './Play.module.scss';
import edit from '../../asets/images/edit1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen, editMostBeEdited } from '../../features/PlaysSlice';
import { fetchUpdateSeat } from '../../features/PlaysSlice';
export default function Play({ id, title, image, date, time, seats }) {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.users);

  const [bookCount, setBookCount] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState('');
  const handleModal = () => {
    dispatch(toggleIsOpen());
    dispatch(editMostBeEdited({ id }));
  };
  useEffect(() => {
    console.log(isBooked, 'issssssboked');
  }, [isBooked]);

  const updateSeat = () => {
    const obj = {
      uid: id,
      title: title,
      date: date,
      time: time,
      image: image,
      seats: seats - bookCount,
    };
    dispatch(fetchUpdateSeat(obj));
    setIsBooked(!isBooked);
  };

  const handleBook = (e) => {
    if (+seats) {
      setBookCount(e.target.value);
    } else {
      setMessage('No tickets');
    }
  };

  return (
    <>
      <div className={styles.playBlock}>
        <div className={styles.titleBlock}>
          <div>
            <h4>{title}</h4>
          </div>
          <div className={styles.editBlock} onClick={() => handleModal(id)}>
            <img src={edit} alt="" />
          </div>
        </div>
        <div className={styles.img}>
          <img src={image} alt="" />
        </div>
        <div className={styles.dateTime}>
          <div>
            <p>{date}</p>
          </div>
          <div>
            <p>{time}</p>
          </div>
        </div>
        <div>
          {seats == 0 ? (
            <p>NO available tickets</p>
          ) : (
            <p>available tickets - {seats}</p>
          )}
        </div>
        {!isBooked ? (
          <div className={styles.book}>
            {isUser && <button onClick={updateSeat}>Book</button>}
            <input
              type="number"
              onChange={(e) => handleBook(e)}
              value={bookCount}
            />
            <span className={styles.span}>{message}</span>
          </div>
        ) : (
          <p>Booked</p>
        )}
      </div>
    </>
  );
}
