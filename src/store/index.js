import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import playsReducer from '../features/PlaysSlice';
import bookingsReducer from '../features/BookingsSlice';
export default configureStore({
  reducer: {
    users: usersReducer,
    plays: playsReducer,
    bookings: bookingsReducer,
  },
});
