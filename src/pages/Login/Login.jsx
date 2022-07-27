import React, { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';

const auth = getAuth();
export default function Login() {
  const navigate = useNavigate();
  const mailRef = useRef(null);
  const passRef = useRef(null);
  const handlerOnSubmit = async (e) => {
    console.log('login page');
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      mailRef.current.value,
      passRef.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, 'then user');

        if (user) {
          return <Navigate replace to="/" />;
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
