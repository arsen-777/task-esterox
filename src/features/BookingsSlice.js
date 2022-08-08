import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { refFromURL } from 'firebase/database';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async function (obj) {
    console.log(obj, 'fetch book bookedobj');
    const dbRef = ref(getDatabase());
    // dbRef
    //   .orderByChild('id')
    //   .equalTo('p4Kld4noBqcfv6lL6I4ibBwwT8J2')
    //   .on('child_added', function (snapshot) {
    //     console.log(snapshot.key);
    //   });
    // console.log(
    //   get(child(dbRef, `/bookings/${obj.userId}`)),
    //   '======================'
    // );
    console.log(obj.userId, '--userId-----------------');
    const snapshot = await get(child(dbRef, `/bookings/${obj.userId}`));
    // console.log(snapshot.val(), 'snapshot.val()');
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
      // console.log(objBooks, 'objBooks');
      const newUserBooks = [];
      let newObj = {};
      for (let key in objBooks) {
        // console.log(objBooks[key], 'item');
        // newUserBooks.push({ userId: objBooks.userId, ...objBooks[key] });
        // debugger;
        if (objBooks[key].userId in newObj) {
          newObj[objBooks[key].userId].push(objBooks[key]);
        } else {
          newObj[objBooks[key].userId] = [objBooks[key]];
        }
      }
      for (let key in newObj) {
        newUserBooks.push(newObj[key]);
      }
      // console.log(newUserBooks, 'newUserBooks');
      console.log(newUserBooks, 'newUserBooks');
      const newArrayUser = newUserBooks[0].map((book) => {
        console.log(book, 'book');
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

      // const newArrayAdmin = newUserBooks.map((book) => {
      //   let {
      //     playName,
      //     ticketsCount,
      //     username,
      //     email,
      //     status,
      //     bookedDate,
      //     id,
      //     playDate,
      //     bookingId,
      //   } = book;
      //   return {
      //     playName,
      //     ticketsCount,
      //     username,
      //     email,
      //     status,
      //     bookedDate,
      //     id,
      //     playDate,
      //     bookingId,
      //   };
      // });

      // state.bookingsAdmin = newArrayAdmin;
      console.log(newArrayUser, 'newArrayUser');
      state.bookingsUser = newArrayUser;
    },
  },
});

export const { editStatus } = bookingsSlice.actions;

export default bookingsSlice.reducer;

//////////////////////////
