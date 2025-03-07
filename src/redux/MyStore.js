import {configureStore} from '@reduxjs/toolkit';

import AuthReducer from './AuthSlice';
import PostReducer from './PostSlice';
import ThemeSlice  from './ThemeSlice';
const MyStore = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    theme: ThemeSlice,
  },
});

export default MyStore;
