import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import backendURL from '../utils/Strings';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async token => {
    const res = await axios.post(`${backendURL}/userdata`, {token});

    return res.data.data;
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    userReduxToken: null,
    userData: null,
    loading: false,
    error: false,
  },
  reducers: {
    setAuthData(state, action) {
      state.userReduxToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setAuthData} = AuthSlice.actions;
export default AuthSlice.reducer;
