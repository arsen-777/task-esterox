import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, child, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
export const fetchAllUsers = createAsyncThunk(
  'plays/fetchAllUsers',
  async function () {
    const dbRef = ref(getDatabase());
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const snapshot = await get(child(dbRef, `users/${userId}`));

    if (snapshot.exists()) {
      const user = await snapshot.val();
      return { id: userId, ...user };
    } else {
      console.log('No data available');
    }
  }
);
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isUser: false,
  },
  reducers: {
    addUser(state, action) {
      state.cards.push(action.payload);
    },
    toggleIsUser(state, action) {
      state.isUser = action.payload;
    },
  },
  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser, toggleIsUser } = usersSlice.actions;

export default usersSlice.reducer;
