import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import thunkMiddleware from 'redux-thunk';
import postsSlice from "./slices/postsSlice";
import commentsSlice from "./slices/commentsSlice";
import commonSlice from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    comments: commentsSlice,
    commonData: commonSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch