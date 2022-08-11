import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../../features/usersSlice';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';

export default function Login() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mailRef = useRef(null);
  const passRef = useRef(null);

  const handlerOnSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      mailRef.current.value,
      passRef.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          dispatch(fetchAllUsers());
          return navigate('/userplay');
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className={styles.loginBg}>
      <div className={styles.loginContainer}>
        <form onSubmit={handlerOnSubmit}>
          <h2>Login</h2>
          <div className={styles.formBlock}>
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
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
