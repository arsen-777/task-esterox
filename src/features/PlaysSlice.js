import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDatabase,
  ref,
  get,
  child,
  update,
  push,
  remove,
} from 'firebase/database';

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
    const db = getDatabase();
    console.log(obj, 'iddddddddddddddddddddd');
    try {
      update(ref(db, `plays/${obj.id}`), obj);

      dispatch(editPlay({ obj, mostBeEdited: obj.id }));
    } catch (error) {
      console.log('error in catch', error);
    }
  }
);

export const fetchDeletePlay = createAsyncThunk(
  'plays/fetchDeletePlay',
  async function (uid, { dispatch }) {
    const db = getDatabase();
    remove(ref(db, `plays/${uid}`));
    dispatch(deletePlay({ id: uid }));
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
    isBooked: false,
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
      state.mostBeEdited = action.payload.id;
    },
    deleteEditedPlayIe(state, action) {
      state.mostBeEdited = action.payload;
    },
    toggleIsBooked(state) {
      state.isBooked = true;
    },
    editPlay(state, action) {
      const { mostBeEdited, obj } = action.payload;
      console.log(mostBeEdited, 'edit playi id');
      const changedPlays = state.allPlays.map((play) => {
        if (play.id === mostBeEdited) {
          return (play = { id: mostBeEdited, ...obj });
        } else {
          return play;
        }
      });
      state.allPlays = changedPlays;
    },
    deletePlay(state, action) {
      console.log(action.payload.id, 'delete action');
      console.log(state.allPlays, 'allllllll');
      state.allPlays = state.allPlays.filter(
        (play) => play.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [fetchPlays.fulfilled]: (state, action) => {
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
    [fetchUpdateSeat.fulfilled]: (state, action) => {},
  },
});

export const {
  addPost,
  toggleIsOpen,
  editMostBeEdited,
  editPlay,
  deleteEditedPlayIe,
  toggleIsBooked,
  deletePlay,
} = playsSlice.actions;

export default playsSlice.reducer;
