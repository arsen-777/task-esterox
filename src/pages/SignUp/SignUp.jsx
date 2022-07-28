import React, { useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Link } from 'react-router-dom';
const auth = getAuth();
export default function SignUp() {
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);

  const handlerOnSubmit = async (e) => {
    console.log('start');
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(
      auth,
      mailRef.current.value,
      passRef.current.value
    );

    function writeUserData(userId, name, email) {
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
    <div>
      <form onSubmit={handlerOnSubmit}>
        Registration
        <div>
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
        <button type="submit">Register</button>
        <Link to="/login">Log In</Link>
      </form>
    </div>
  );
}
