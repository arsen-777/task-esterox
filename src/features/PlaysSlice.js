import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child, update, push } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';

export const fetchPlays = createAsyncThunk(
  'plays/fetchPlays',
  async function ({ id }) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/plays/${id}`));
    return snapshot.val();
  }
);

export const fetchAllPlays = createAsyncThunk(
  'plays/fetchAllPlays',
  async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/plays`));

    return snapshot.val();
  }
);

export const fetchUpdateSeat = createAsyncThunk(
  'plays/fetchUpdateSeat',
  async function (obj, { dispatch }) {
    // console.log(obj, 'stexinyyyyyyyyyyy');
    const db = getDatabase();
    // const postData = {
    //   uid: id,
    //   title: title,
    //   date: date,
    //   time: time,
    //   seats: bookCount,
    // };
    // console.log(postData, 'postdtaaaaaaa');
    // const newPostKey = push(child(ref(db), 'plays')).key;
    // const updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + id + '/' + newPostKey] = postData;
    // console.log(update(ref(db), updates), 'update(ref(db), updates)');
    // return update(ref(db), updates);
    try {
      // console.log(obj.id, 'idddddddddddddddddddddddddddddddddddddd');
      console.log('entered try----');
      const updatedSeat = update(ref(db, `plays/${obj.uid}`), obj);

      dispatch(editPlay({ obj, mostBeEdited: obj.uid }));
    } catch (error) {
      console.log('error in catch', error);
    }
  }
);

const playsSlice = createSlice({
  name: 'plays',
  initialState: {
    plays: [],
    allPlays: [],
    isOpen: false,
    isEdited: false,
    mostBeEdited: null,
  },
  reducers: {
    addPost(state, action) {
      state.plays.push(action.payload);
    },
    toggleIsOpen(state) {
      state.isOpen = !state.isOpen;
    },
    toggleIsEdited(state) {
      state.isEdited = !state.isEdited;
    },
    editMostBeEdited(state, action) {
      console.log(action.payload.id);
      state.mostBeEdited = action.payload.id;
    },
    deleteEditedPlayIe(state, action) {
      state.mostBeEdited = action.payload;
    },
    editPlay(state, action) {
      console.log(action.payload, '555555555555555555555');

      const { mostBeEdited, obj } = action.payload;
      const changedPlays = state.allPlays.map((play) => {
        if (play.id === mostBeEdited) {
          return (play = { id: mostBeEdited, ...obj });
        } else {
          return play;
        }
      });
      state.allPlays = changedPlays;
      // state.mostBeEdited = mostBeEdited;
    },
  },
  extraReducers: {
    [fetchPlays.fulfilled]: (state, action) => {
      // console.log(action);
      state.allPlays.push(action.payload);
    },
    [fetchAllPlays.fulfilled]: (state, action) => {
      let obj = action.payload;
      const newPlays = [];
      for (const id in obj) {
        newPlays.push({ id, ...obj[id] });
      }
      state.allPlays = newPlays;
    },
    [fetchUpdateSeat.fulfilled]: (state, action) => {
      console.log(action.payload, 'updati action payloadnaaaaaaa');
    },
  },
});

export const {
  addPost,
  toggleIsOpen,
  editMostBeEdited,
  editPlay,
  deleteEditedPlayIe,
} = playsSlice.actions;

export default playsSlice.reducer;
