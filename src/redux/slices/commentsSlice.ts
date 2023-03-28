import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

export const fetchComments= createAsyncThunk(
  'comments/commentsData',
  async () => {
    let commentsData: any = [];
    try {
      await firestore().collection("comments").get().then(data => {
        data.docs.forEach((element: any) => {
            commentsData.push((element.data()))
        });
      });
    } catch (err) {
      console.log(err);
    }
    return commentsData;
  }
)

export const createComment = createAsyncThunk(
  'firestore/CommentCreate',
  async (data: any) => {
    await firestore().collection("Comments").add({data}).then(res =>{
      return res
    }).catch(error => {
      return error.code;
    });
  }
);

export const updateComment = createAsyncThunk(
  'firestore/updateComment',
  async (data) => {
    await firestore().collection("Comments").doc('r7FqlWqtvUfQTckcJXmw').update({data}).then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

export const deleteComment = createAsyncThunk(
  'firestore/deleteComment',
  async () => {
    await firestore().collection("Comments").doc('A8heMQs94V8Jie2pqcO3').delete().then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

const initialState: { commentsData: any[], isLoading: boolean } = {
    commentsData: [],
  isLoading: false,
};


export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commentsData = action.payload
    }),
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.CommentData = action.payload
    }),
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.CommentData = action.payload
    }),
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.CommentData = action.payload
    })
  },
});

export const { comments } = commentsSlice.actions;

export default commentsSlice.reducer;
