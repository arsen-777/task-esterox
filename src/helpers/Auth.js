// import auth from 'firebase';
// import { useEffect } from 'react';
// import { useSelector, useDispatch } from './react-redux';
// import { addUser } from '../features/usersSlice';

// export default function AuthProvider({ children }) {
//   const users = useSelector((state) => state.users);
//   const dispatch = useDispatch();

//   function signup(name, email, password) {
//     return auth.createUserWithEmailAndPassword(name, email, password);
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       dispatch(addUser(user));
//     });
//     return unsubscribe;
//   }, []);
//   const value = {
//     users,
//     signup,
//   };
// }
