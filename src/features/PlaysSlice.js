import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const db = getDatabase();
const auth = getAuth();

export const fetchPlays = createAsyncThunk(
  'plays/fetchPlays',
  async function ({ id }) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/plays/${id}`));
    console.log(snapshot.val());

    return snapshot.val();
  }
);

export const fetchAllPlays = createAsyncThunk(
  'plays/fetchAllPlays',
  async function () {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/plays`));
    console.log(snapshot.val());

    return snapshot.val();
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
    toggleIsOpen(state, action) {
      state.isOpen = !state.isOpen;
    },
    toggleIsEdited(state, action) {
      state.isEdited = !state.isEdited;
    },
    editMostBeEdited(state, action) {
      state.mostBeEdited = action.payload.id;
    },
  },
  extraReducers: {
    [fetchPlays.fulfilled]: (state, action) => {
      console.log(action);
      state.allPlays.push(action.payload);
    },
    [fetchAllPlays.fulfilled]: (state, action) => {
      let obj = action.payload;
      const newPlays = [];
      for (const id in obj) {
        newPlays.push({ id, ...obj[id] });
      }
      console.log(newPlays, 'all action plays');
      state.allPlays = newPlays;
    },
  },
});

export const { addPost, toggleIsOpen, editMostBeEdited } = playsSlice.actions;

export default playsSlice.reducer;
