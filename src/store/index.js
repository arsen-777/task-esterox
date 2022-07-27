import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import playsReducer from '../features/PlaysSlice';
export default configureStore({
  reducer: {
    users: usersReducer,
    plays: playsReducer,
  },
});
