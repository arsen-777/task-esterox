import React, { useRef, useState, useEffect } from 'react';
import TimePicker from 'react-time-picker-input';

import { getDatabase, ref, update, set, push } from 'firebase/database';
import { fetchPlays } from '../../features/PlaysSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleIsOpen,
  editPlay,
  deleteEditedPlayId,
  toggleIsCropped,
} from '../../features/PlaysSlice';
import styles from './PlayForm.module.scss';
import uuid from 'react-uuid';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import upload from '../../asets/images/upload.svg';
import useClickOutside from '../hooks/useClickOutside';

export default function PlayForm() {
  const filePicker = useRef(null);
  const modalRef = useRef(null);
  const handlePick = () => {
    filePicker.current.click();
    dispatch(toggleIsCropped(true));
  };

  const { mostBeEdited, allPlays, addMessage, editMessage, isCropped } =
    useSelector((state) => state.plays);
  const editedCard = allPlays.find((play) => play.id === mostBeEdited);
  const [title, setTitle] = useState(editedCard?.title || '');
  const [date, setDate] = useState(editedCard?.date || '');
  const [time, setTime] = useState(editedCard?.time || '0');
  const [croppedImage, setCroppedImage] = useState(editedCard?.image || null);
  const [fileName, setFileName] = useState(null);
  const [seats, setSeats] = useState(editedCard?.seats || '');
  const { isOutsideClick } = useSelector((state) => state.plays);
  const cropperRef = useRef(null);
  const db = getDatabase();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(deleteEditedPlayId(null));
    dispatch(toggleIsOpen());
    dispatch(toggleIsCropped(false));
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    setFileName(null);
  };

  function handleOptionChange(e) {
    setSeats(e.target.value);
  }
  function handleTime(e) {
    setTime(e.target.value);
  }
  console.log(fileName, 'filename ------');

  const submitHandler = (e) => {
    dispatch(toggleIsCropped(false));
    e.preventDefault();
    let obj = {
      key: uuid(),
      title: title,
      date: date,
      time: time,
      image: croppedImage,
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
  const updateOnePlays = async (e) => {
    let str = prompt('Are you sure to update play? yes/no');
    e.preventDefault();
    // change file type to blob

    let obj = {
      title: title,
      date: date,
      time: time,
      image: croppedImage,
      seats: seats,
      uid: mostBeEdited,
    };

    try {
      if ('yes') {
        dispatch(deleteEditedPlayId(null));
        console.log('entered try----');
        update(ref(db, `plays/${mostBeEdited}`), obj);
        dispatch(editPlay({ obj, mostBeEdited }));
      }
    } catch (error) {
      console.log('error in catch', error);
    }
    closeModal();
  };
  useClickOutside(modalRef, () => dispatch(toggleIsOpen()), isOutsideClick);
  return (
    <div className={styles.modal}>
      <div ref={modalRef} className={styles.modalAbsolute}>
        <h3> {!mostBeEdited ? addMessage : editMessage}</h3>
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
            <div className={styles.paragraph}>
              <label htmlFor="">Date/time</label>
              <div className={styles.dateBlock}>
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
                <div>
                  <TimePicker onChange={(e) => setTime(e)} value={time} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imgSeats}>
            <div className={styles.seatsBlock}>
              <label htmlFor="seats">Seats count</label>
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
                      // setFileName(e.target.files[0]);
                      const fileReader = new FileReader();
                      fileReader.addEventListener('load', (e) => {
                        setFileName(e.target.result);
                      });

                      fileReader.readAsDataURL(e.target.files[0]);
                    }}
                    type="file"
                    name="file"
                    accept="image/*"
                  />
                </div>
                <div onClick={handlePick} className={styles.uploadImg}>
                  <p>Upload image</p>
                  <div>
                    <img src={upload} alt="" />
                  </div>
                </div>
              </div>

              <div className={styles.img}>
                <img src={fileName || croppedImage} alt="" />
              </div>
            </div>
          </div>
          {fileName && (
            <>
              {fileName && isCropped && (
                <Cropper
                  src={fileName}
                  style={{ height: 200, width: '100%' }}
                  initialAspectRatio={16 / 9}
                  guides={false}
                  modal
                  ref={cropperRef}
                />
              )}
              <button type="button" onClick={onCrop}>
                click
              </button>
            </>
          )}
          <div className={styles.buttonsBlock}>
            <button onClick={closeModal}>Cancel</button>
            {!mostBeEdited && <button type="submit">Save</button>}
            {mostBeEdited && (
              <button onClick={updateOnePlays} type="submit">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

////////

// 1) add ev edit jamanak buttonnery petq e erevan hamapatasxanabar  // plus
// 2) close icon-y poxel jnjelu                                     // plus
// 3) hastatelu hamar modal baci                                   // plus
// 4)  / -i  backgroundy repeat                                     // plus
// 5) seats i mej karoxana dzerov grel                              // plusot
// 6) playname aprove aneluc trnuma                                   plus
//7) admin booked nael`````                                           // plus
// 8) firefox -i vra input type time dzel ev width-y     ///         xndira fixel em iranc motica voncvor
// 9) fixel booked qanaky minus chgna                              // plus
// 10) fixel tarber userneri book ery i pahy                        // plus
// 11) registratia jamanak link dnel vor gna login                 // plus
// 12) user nor mtneluc hinna pahum piti refresh anes vor dzvi
