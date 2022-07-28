import React, { useRef, useState } from 'react';
import uuid from 'react-uuid';
import { getDatabase, ref, set, push } from 'firebase/database';
import { fetchPlays } from '../../features/PlaysSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsOpen } from '../../features/PlaysSlice';
import styles from './PlayForm.module.scss';

export default function PlayForm() {
  const { mostBeEdited, allPlays } = useSelector((state) => state.plays);
  const editedCard = allPlays.find((play) => play.id === mostBeEdited);
  const [title, setTitle] = useState(editedCard?.title || '');
  const [date, setDate] = useState(editedCard?.date || '');
  const [time, setTime] = useState(editedCard?.time || '');
  const [fileName, setFileName] = useState('');
  const [seats, setSeats] = useState(editedCard?.seats || '');

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleIsOpen());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // change file type to blob
    let file;
    let reader = new FileReader();
    reader.readAsDataURL(fileName);
    reader.onload = function async() {
      file = reader.result;
      let obj = {
        title: title,
        date: date,
        time: time,
        image: file,
        seats: seats,
      };
      try {
        const db = getDatabase();
        const postListRef = ref(db, 'plays');
        const newPostRef = push(postListRef);
        set(newPostRef, obj);

        dispatch(fetchPlays({ id: newPostRef.key }));
      } catch (error) {
        console.log('error in catch');
      }
      closeModal();
    };
  };

  function handleOptionChange(e) {
    setSeats(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalAbsolute}>
        <h3>Add New play</h3>
        <form onSubmit={submitHandler} className={styles.formBlock}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              value={title}
            />
          </div>
          <div>
            <label htmlFor="date-time">Date/time</label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date-time"
              value={date}
            />
          </div>
          <div>
            <label htmlFor="time"></label>
            <input
              onChange={(e) => handleTime(e)}
              type="time"
              name="time"
              value={time}
            />
          </div>
          <div>
            <label htmlFor="seats"></label>
            <input
              type="number"
              onChange={(e) => handleOptionChange(e)}
              value={seats}
            />
          </div>
          <div>
            <label htmlFor="file"></label>
            <input
              onChange={(e) => setFileName(e.target.files[0])}
              type="file"
              name="file"
            />
          </div>
          <div>
            <button onClick={closeModal}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
