import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: 'AIzaSyA3dmBGZ38nY3zZWd42EgFMHEMmebmuHig',
  authDomain: 'all-books-85ab7.firebaseapp.com',
  projectId: 'all-books-85ab7',
  storageBucket: 'all-books-85ab7.appspot.com',
  messagingSenderId: '852315057479',
  appId: '1:852315057479:web:76d6f140fbb911f3f7f062',
});

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_DATABASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENGER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

export default app;
