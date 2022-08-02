import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child } from 'firebase/database';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/bookings`));

    console.log(snapshot.val(), ' console.log( snapshot.val()');
    return snapshot.val();
  }
);
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookingsUser: [],
    bookingsAdmin: [],
  },
  reducers: {},
  extraReducers: {
    [fetchBookings.fulfilled]: (state, action) => {
      console.log(action.payload, 'action bookings');
      const objBooks = action.payload;
      const newUserBooks = [];
      for (let key in objBooks) {
        newUserBooks.push(objBooks[key]);
      }
      const newArrayUser = newUserBooks.map((book) => {
        let { playName, ticketsCount, bookedDate, playDate, status } = book;
        return { playName, ticketsCount, bookedDate, playDate, status };
      });
      const newArrayAdmin = newUserBooks.map((book) => {
        let { playName, ticketsCount, username, email, status, bookedDate } =
          book;
        return { playName, ticketsCount, username, email, status, bookedDate };
      });
      // console.log(newArrayUser, 'userssss array newArrayUser');

      // console.log(newArrayAdmin, 'userssss array newArrayAdmin');
      state.bookingsAdmin = newArrayAdmin;
      state.bookingsUser = newArrayUser;
    },
  },
});

// export const {} = bookingsSlice.actions;

export default bookingsSlice.reducer;

//////////////////////////
