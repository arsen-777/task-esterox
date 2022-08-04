import React, { useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../../features/usersSlice';
import { useDispatch } from 'react-redux';
import { toggleIsUser } from '../../features/usersSlice';
import styles from './Login.module.scss';
const auth = getAuth();
export default function Login() {
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
          dispatch(toggleIsUser());
          return navigate('/userplay');
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
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
          <Link to="/signUp">
            <button>Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
