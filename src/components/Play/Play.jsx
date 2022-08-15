import React, {useState} from 'react';
import { useLocation } from "react-router";
import styles from './Play.module.scss';
import edit from '../../asets/images/eee.svg';
import del from '../../asets/images/dd.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
    toggleIsOpen,
    editMostBeEdited,
    fetchDeletePlay,
    editMessage,
} from '../../features/PlaysSlice';
import {getDatabase, ref, set, push} from 'firebase/database';
import {fetchUpdateSeat} from '../../features/PlaysSlice';
import {fetchBookings} from '../../features/BookingsSlice';
import {dateToUTC} from '../../helpers/formaterDate';
import uuid from 'react-uuid';

export default function Play({id, title, image, date, time, seats}) {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {isUser} = useSelector((state) => state.users);
    const {users} = useSelector((state) => state.users);
    const {bookingsUser} = useSelector((state) => state.bookings);
    const [bookCount, setBookCount] = useState(0);
    const [message, setMessage] = useState('');
    let isBooked = bookingsUser.find((item) => item.playId === id);
    const {users: [currentUser]} = useSelector((state) => state.users);

    const handleModal = () => {
        dispatch(toggleIsOpen());
        dispatch(editMostBeEdited({id}));
        dispatch(editMessage('Edit play'));
    };

    const updateSeat = () => {
        let obj;
        let bookedObject;
        if (bookCount <= seats) {
            obj = {
                id: id,
                title: title,
                date: date,
                time: time,
                image: image,
                seats: seats - bookCount,
            };
            bookedObject = {
                key: uuid(),
                playId: id,
                playName: title,
                playDate: date,
                status: 'pending',
                ticketsCount: bookCount,
                bookedDate: dateToUTC(new Date()),
                userId: users[0]?.id,
                ...users[0],
            };
        } else {
            alert('Write correct seats count');
        }

        try {
            const db = getDatabase();
            const postListRef = ref(db, 'bookings/' + users[0]?.id);
            const newPostRef = push(postListRef);
            set(newPostRef, bookedObject);
        } catch (error) {
            console.log('error in catch');
        }
        dispatch(fetchUpdateSeat(obj));
        dispatch(fetchBookings(bookedObject));
    };
    const handleBook = (e) => {
        if (+seats && e.target.value > 0 && e.target.value <= seats) {
            setBookCount(e.target.value);
        }
        if (e.target.value < 0 && e.target.value > seats) {
            alert('Please write correct number');
        } else if (!seats) {
            setMessage('No tickets');
        }
    };
    const deletePlay = (id) => {
        dispatch(fetchDeletePlay(id));
    };
    return (
        <>
            <div className={styles.playBlock}>
                <div className={styles.titleBlock}>
                    <div className={styles.title}>
                        <p>{title}</p>
                    </div>
                    {!isUser && (
                        <div className={styles.delEdit}>
                            <div onClick={() => handleModal(id)} className={styles.editBlock}>
                                <img src={edit} alt=""/>
                            </div>
                            <div onClick={() => deletePlay(id)} className={styles.delete}>
                                <img src={del} alt=""/>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.img}>
                    <img src={image} alt=""/>
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
                    {+seats === 0 ? (
                        <p>NO available tickets </p>
                    ) : (
                        <p>
                            Available tickets - <span className={styles.count}>{seats}</span>
                        </p>
                    )}
                </div>
                {!pathname.includes('admin') && <>
                    {!isBooked ? (
                        <div className={styles.book}>
                            {isUser && seats && (
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
                </>}

            </div>
        </>
    );
}
