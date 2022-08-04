import React, { useRef, useState } from 'react';
import { getDatabase, ref, update, set, push } from 'firebase/database';
import { fetchPlays } from '../../features/PlaysSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleIsOpen,
  editPlay,
  deleteEditedPlayIe,
} from '../../features/PlaysSlice';
import styles from './PlayForm.module.scss';
import uuid from 'react-uuid';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import upload from '../../asets/images/upload.svg';
import dateImg from '../../asets/images/date.svg';

export default function PlayForm() {
  const filePicker = useRef(null);
  const datePicker = useRef(null);
  const handlePick = () => {
    // console.log(filePicker.current.click());
    filePicker.current.click();
  };
  const handleDatePicker = () => {
    console.log(datePicker.current.click());
    datePicker.current.click();
  };
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL(), 'croppppppppperrrrrr');
  };
  const { mostBeEdited, allPlays } = useSelector((state) => state.plays);
  const editedCard = allPlays.find((play) => play.id === mostBeEdited);
  const [title, setTitle] = useState(editedCard?.title || '');
  const [date, setDate] = useState(editedCard?.date || '');
  const [time, setTime] = useState(editedCard?.time || '');
  const [fileName, setFileName] = useState(editedCard?.image);
  const [seats, setSeats] = useState(editedCard?.seats || '');
  const [isCrop, setIsCrop] = useState(false);
  // const [photoUrl, setPhotoUrl] = useState('');
  const db = getDatabase();

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleIsOpen());
  };
  function handleOptionChange(e) {
    setSeats(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // change file type to blob
    let file;
    let reader = new FileReader();
    reader.readAsDataURL(fileName);
    reader.onload = function async() {
      file = reader.result;
      let obj = {
        key: uuid(),
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
        dispatch(fetchPlays({ id: newPostRef.key, ...obj }));
      } catch (error) {
        console.log('error in catch');
      }
      closeModal();
    };
  };
  const updateOnePlays = (e) => {
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
        uid: mostBeEdited,
      };

      try {
        dispatch(deleteEditedPlayIe(null));
        console.log('entered try----');
        update(ref(db, `plays/${mostBeEdited}`), obj);
        dispatch(editPlay({ obj, mostBeEdited }));
      } catch (error) {
        console.log('error in catch', error);
      }
      closeModal();
    };
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalAbsolute}>
        <h3>Add New play</h3>
        <form onSubmit={submitHandler} className={styles.formBlock}>
          <div className={styles.label}>
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              value={title}
            />
          </div>
          <div className={styles.dateTimeBlock}>
            <div className={styles.dateBlock}>
              Date/time
              <div className={styles.dateLabel}>
                <input
                  className={styles.dateInput}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="date-time"
                  value={date}
                  id="date-time"
                />
              </div>
              <div className={styles.labelTime}>
                <input
                  onChange={(e) => handleTime(e)}
                  type="time"
                  name="time"
                  value={time}
                />
              </div>
            </div>
          </div>
          <div className={styles.imgSeats}>
            <div className={styles.seatsBlock}>
              <label htmlFor="seats"></label>
              <input
                type="number"
                onChange={(e) => handleOptionChange(e)}
                value={seats}
              />
            </div>
            <div>
              <div className={styles.uploadBlock}>
                <div>
                  <input
                    ref={filePicker}
                    className={styles.hidden}
                    onChange={(e) => {
                      setFileName(e.target.files[0]);

                      // setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                      // setIsCrop(!isCrop);
                    }}
                    type="file"
                    name="file"
                    accept="image/*"
                  />
                </div>
                <div onClick={handlePick} className={styles.uploadImg}>
                  <img src={upload} alt="" />
                  <p>Upload image</p>
                </div>
              </div>

              {/* {isCrop && (
              <Cropper
                src={photoUrl}
                style={{ height: 200, width: '100%' }}
                initialAspectRatio={16 / 9}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
              />
            )} */}
              <div>
                <img src={fileName} alt="" />
              </div>
            </div>
          </div>
          <div>
            <button onClick={closeModal}>Cancel</button>
            <button type="submit">Save</button>
            <button onClick={updateOnePlays} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
