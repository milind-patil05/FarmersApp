import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

export const fetchUser = createAsyncThunk(
  'users/userData',
  async () => {
    let userData: any = [];
    try {
      await firestore().collection("user").get().then(data => {
        data.docs.forEach((element: any) => {
          userData.push((element.data()))
        });
      });
    } catch (err) {
      console.log(err);
    }
    return userData;
  }
)

export const createUser = createAsyncThunk(
  'firestore/userCreate',
  async (data: any) => {
    await firestore().collection("user").add({data}).then(res =>{
      return res
    }).catch(error => {
      return error.code;
    });
  }
);

export const updateUser = createAsyncThunk(
  'firestore/updateUser',
  async (data) => {
    await firestore().collection("user").doc('r7FqlWqtvUfQTckcJXmw').update({data}).then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

export const deleteUser = createAsyncThunk(
  'firestore/deleteUser',
  async () => {
    await firestore().collection("user").doc('A8heMQs94V8Jie2pqcO3').delete().then(res =>{
      return res;
    }).catch(error => {
      return error.code;
    });
  }
);

const initialState: { userData: any[], isLoading: boolean } = {
  userData: [],
  isLoading: false,
};


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload
    }),
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.userData = action.payload
    }),
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.userData = action.payload
    }),
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.userData = action.payload
    })
  },
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
