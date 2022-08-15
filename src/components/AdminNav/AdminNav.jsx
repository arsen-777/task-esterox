import React from 'react';
import styles from './AdminNav.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


export default function AdminNav() {
    const {users: [currentUser]} = useSelector((state) => state.users);

    console.log(currentUser, 'currentUSer');
    return (
        <div className={styles.adminNav}>
            <div className={styles.links}>
                <Link className={styles.link} to="/adminplays">
                    Plays
                </Link>
                <Link className={styles.link} to="/adminbookings">
                    Bookings
                </Link>
                <Link className={styles.link} to="/userplay">
                    User menu
                </Link>
            </div>
            <div>
                <p>Admin/ {currentUser.username}</p>
            </div>
        </div>

    );
}
