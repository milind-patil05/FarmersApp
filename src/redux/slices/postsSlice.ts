import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

export const fetchPosts = createAsyncThunk(
  'posts/postsData',
  async () => {
    let postsData: any = [];
    try {
      await firestore().collection("posts").get().then(data => {
        data.docs.forEach((element: any) => {
            postsData.push((element.data()))
        });
      });
    } catch (err) {
      console.log(err);
    }
    return postsData;
  }
)

export const createPost = createAsyncThunk(
  'firestore/PostCreate',
  async (data: any) => {
    await firestore().collection("posts").add(data).then(res =>{
      return res
    }).catch(error => {
      return error.code;
    });
  }
);

export const updatePost = createAsyncThunk(
  'firestore/updatePost',
  async (data) => {
    await firestore().collection("posts").doc('r7FqlWqtvUfQTckcJXmw').update(data).then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

export const deletePost = createAsyncThunk(
  'firestore/deletePost',
  async () => {
    await firestore().collection("posts").doc('A8heMQs94V8Jie2pqcO3').delete().then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

const initialState: { postsData: any[], isLoading: boolean } = {
    postsData: [],
  isLoading: false,
};


export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload
    }),
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.PostData = action.payload
    }),
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.PostData = action.payload
    }),
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.PostData = action.payload
    })
  },
});

export const { posts } = postsSlice.actions;

export default postsSlice.reducer;
