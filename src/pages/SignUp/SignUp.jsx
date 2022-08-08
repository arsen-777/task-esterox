import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';
import useAuth from '../../components/hooks/useAuth';

const auth = getAuth();

export default function SignUp() {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);
  const user = useAuth();
  const handlerOnSubmit = async (e) => {
    console.log('start');
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(
      auth,
      mailRef.current.value,
      passRef.current.value
    );

    function writeUserData(userId, name, email) {
      // console.log(userId, name, email, 'registratia');
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        role: 'user',
      });
    }
    writeUserData(user.user.uid, nameRef.current.value, user.user.email);
  };
  return (
    <div className={styles.signUpContainer}>
      <form onSubmit={handlerOnSubmit}>
        <h2> Registration</h2>
        <div className={styles.formBlock}>
          <div>
            <label htmlFor="name">Name</label>
            <input ref={nameRef} type="text" name="mail" />
          </div>
          <div>
            <label htmlFor="mail">Email</label>
            <input ref={mailRef} type="email" name="name" />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input ref={passRef} type="password" name="pass" />
          </div>
        </div>
        <div className={styles.signUpLogin}>
          <button type="submit">Register</button>
          {user && (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
