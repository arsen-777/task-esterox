import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsUser } from '../../features/usersSlice';
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
    <div>
      <form onSubmit={handlerOnSubmit}>
        Login
        <div>
          <div>
            <label htmlFor="mail">Email</label>
            <input ref={mailRef} type="email" name="name" />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input ref={passRef} type="password" name="pass" />
          </div>
        </div>
        <button type="submit">Log In</button>
        <Link to="/signUp">Sign Up</Link>
      </form>
    </div>
  );
}
