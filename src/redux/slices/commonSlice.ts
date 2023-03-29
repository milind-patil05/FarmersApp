import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

export const fetchCommonPractices = createAsyncThunk(
  'crop_practices/getData',
  async () => {
    let commonData: any = [];
    try {
      await firestore().collection("crop_practices").get().then(data => {
        data.docs.forEach((element: any) => {
            commonData.push((element.data()))
        });
      });
    } catch (err) {
      console.log(err);
    }
    return commonData;
  }
)

export const fetchGovSchemes = createAsyncThunk(
    'crop_practices/getData',
    async () => {
      let commonData: any = [];
      try {
        await firestore().collection("crop_practices").get().then(data => {
          data.docs.forEach((element: any) => {
              commonData.push((element.data()))
          });
        });
      } catch (err) {
        console.log(err);
      }
      return commonData;
    }
  )

const initialState: { commonData: any[], isLoading: boolean } = {
    commonData: [],
    isLoading: false
  };

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCommonPractices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commonData = action.payload
    })
  },
});

export const { commonData } = commonSlice.actions;

export default commonSlice.reducer;
