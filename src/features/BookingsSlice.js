import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { createBookings } from '../helpers/createBookings';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async function ({ id }) {
    // dispatch(toggleIsLoading(true));
    const dbRef = ref(getDatabase());
    console.log(id, '---------------------------');

    const snapshot = await get(child(dbRef, `/bookings/${id}`));
    const arr = await snapshot.val();

    return arr;

    // dispatch(toggleIsLoading(false));
  }
);

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAllBookings',
  async function (id) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/bookings/`));
    return { id, bookings: snapshot.val() };
  }
);

export const fetchUpdateStatus = createAsyncThunk(
  'bookings/fetchUpdateStatus',
  async function ({ obj, id }, { dispatch }) {
    const db = getDatabase();

    try {
      update(ref(db, `bookings/${id}/${obj.bookingId}`), obj);
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
    toggleIsLoading(state, action) {
      console.log(action.payload);
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchBookings.fulfilled]: (state, action) => {
      const objBooks = action.payload;
      const arr = createBookings(objBooks);
      state.bookingsUser = arr;
    },
    [fetchAllBookings.fulfilled]: (state, action) => {
      let objBooks = action.payload;
      const { bookings } = objBooks;
      const newArrBooks = [];
      for (let key in bookings) {
        for (let book in bookings[key]) {
          newArrBooks.push({ bookingId: book, ...bookings[key][book] });
        }
      }

      const newArrayAdmin = newArrBooks.map((book) => {
        let {
          key,
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
          key,
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
    },
  },
});

export const { editStatus, toggleIsLoading } = bookingsSlice.actions;

export default bookingsSlice.reducer;

//////////////////////////
