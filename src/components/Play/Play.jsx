import React, { useState, useEffect, useCallback } from 'react';
import styles from './Play.module.scss';
import edit from '../../asets/images/edit1.svg';
import del from '../../asets/images/delete.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleIsOpen,
  editMostBeEdited,
  fetchDeletePlay,
} from '../../features/PlaysSlice';
import { getDatabase, ref, set, push } from 'firebase/database';
import { fetchUpdateSeat } from '../../features/PlaysSlice';
import { fetchBookings } from '../../features/BookingsSlice';
import { dateToUTC } from '../../helpers/formaterDate';
import useAuth from '../hooks/useAuth';
import { toggleIsUser } from '../../features/usersSlice';
export default function Play({ id, title, image, date, time, seats }) {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.users);
  const { users } = useSelector((state) => state.users);
  const user = useAuth();
  const { bookingsUser } = useSelector((state) => state.bookings);
  // console.log(user?.uid, 'user');
  const [bookCount, setBookCount] = useState(0);
  const [message, setMessage] = useState('');
  let isBooked = bookingsUser.find((item) => item.playId === id);
  const handleModal = () => {
    dispatch(toggleIsOpen());
    dispatch(editMostBeEdited({ id }));
  };

  useEffect(() => {
    dispatch(toggleIsUser());
  }, [dispatch]);
  const updateSeat = () => {
    const obj = {
      id: id,
      title: title,
      date: date,
      time: time,
      image: image,
      seats: seats - bookCount,
    };
    const bookedObject = {
      playId: id,
      playName: title,
      playDate: date,
      status: 'pending',
      ticketsCount: bookCount,
      bookedDate: dateToUTC(new Date()),
      ...users[0],
    };
    try {
      const db = getDatabase();
      const postListRef = ref(db, 'bookings');
      const newPostRef = push(postListRef);
      set(newPostRef, bookedObject);
    } catch (error) {
      console.log('error in catch');
    }
    dispatch(fetchUpdateSeat(obj));
    dispatch(fetchBookings(bookedObject));
  };
  const handleBook = (e) => {
    if (+seats) {
      setBookCount(e.target.value);
    } else {
      setMessage('No tickets');
    }
  };
  const deletePlay = (id) => {
    dispatch(fetchDeletePlay(id));
  };
  console.log(isUser, 'isUser--------');
  return (
    <>
      <div className={styles.playBlock}>
        <div className={styles.titleBlock}>
          <div className={styles.title}>
            <p>{title}</p>
          </div>
          <div className={styles.delEdit}>
            <div onClick={() => handleModal(id)} className={styles.editBlock}>
              <img src={edit} alt="" />
            </div>
            <div onClick={() => deletePlay(id)} className={styles.delete}>
              <img src={del} alt="" />
            </div>
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
        <div className={styles.tickets}>
          {seats == 0 ? (
            <p>NO available tickets</p>
          ) : (
            <p>
              Available tickets - <span className={styles.count}>{seats}</span>
            </p>
          )}
        </div>
        {!isBooked ? (
          <div className={styles.book}>
            {isUser && (
              <div className={styles.inpBtn}>
                <button onClick={updateSeat}>Book</button>

                <input
                  type="number"
                  onChange={(e) => handleBook(e)}
                  value={bookCount}
                />
              </div>
            )}
            <span className={styles.span}>{message}</span>
          </div>
        ) : (
          <p className={styles.booked}>Booked</p>
        )}
      </div>
    </>
  );
}
