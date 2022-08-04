import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child, update } from 'firebase/database';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/bookings`));

    return snapshot.val();
  }
);

export const fetchUpdateStatus = createAsyncThunk(
  'bookings/fetchUpdateStatus',
  async function (obj, { dispatch }) {
    const db = getDatabase();
    try {
      update(ref(db, `bookings/${obj.bookingId}`), obj);
      dispatch(editStatus({ ...obj }));
    } catch (error) {}
  }
);
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookingsUser: [],
    bookingsAdmin: [],
  },
  reducers: {
    editStatus(state, action) {
      const { bookingId, ...book } = action.payload;
      const updatedBookStatus = state.bookingsAdmin.map((item) => {
        if (item.bookingId === bookingId) {
          return (item = book);
        } else {
          return item;
        }
      });
      state.bookingsAdmin = updatedBookStatus;
    },
  },
  extraReducers: {
    [fetchBookings.fulfilled]: (state, action) => {
      const objBooks = action.payload;
      const newUserBooks = [];
      for (let key in objBooks) {
        newUserBooks.push({ bookingId: key, ...objBooks[key] });
      }
      const newArrayUser = newUserBooks.map((book) => {
        let {
          bookingId,
          playName,
          ticketsCount,
          bookedDate,
          playDate,
          status,
          id,
          playId,
        } = book;
        return {
          playName,
          ticketsCount,
          bookedDate,
          playDate,
          status,
          id,
          bookingId,
          playId,
        };
      });
      const newArrayAdmin = newUserBooks.map((book) => {
        let {
          playName,
          ticketsCount,
          username,
          email,
          status,
          bookedDate,
          id,
          playDate,
          bookingId,
        } = book;
        return {
          playName,
          ticketsCount,
          username,
          email,
          status,
          bookedDate,
          id,
          playDate,
          bookingId,
        };
      });

      state.bookingsAdmin = newArrayAdmin;
      state.bookingsUser = newArrayUser;
    },
  },
});

export const { editStatus } = bookingsSlice.actions;

export default bookingsSlice.reducer;

//////////////////////////
