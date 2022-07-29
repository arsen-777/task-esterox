import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child } from 'firebase/database';

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
    // console.log(snapshot.val());

    return snapshot.val();
  }
);

// export const fetchUpdatePlay = createAsyncThunk(
//   'plays/fetchUpdatePlay',
//   async function (obj, mostBeEdited) {
//     const db = getDatabase();

//     try {
//       update(ref(db, `plays/${mostBeEdited}`), obj);
//     } catch (error) {
//       console.log('errrrrrrrrrr');
//     }
//     // const postData = {
//     //   title,
//     //   date,
//     //   time,
//     //   image,
//     //   seats,
//     // };
//     // const newPostKey = push(child(ref(db), 'plays')).key;
//     // const updates = {};

//     // updates['/plays/' + newPostKey] = postData;

//     // console.log(update(ref(db), updates), 'updatesssssssssssssss');
//   }
// );

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
